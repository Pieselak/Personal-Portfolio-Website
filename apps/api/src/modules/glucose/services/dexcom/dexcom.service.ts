import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GlucoseDexcomConfig } from '../../../../config';
import { GetCurrentGlucoseResponse } from '../../dto/response/getCurrentGlucose.dto';
import { GetGraphDataResponse } from '../../dto/response/getGraphData.dto';
import { GetSensorDataResponse } from '../../dto/response/getSensorData.dto';
import { BaseGlucoseService } from '../../glucose.types';
import { GlucoseDexcomAuthService } from './dexcomAuth.service';
import { GlucoseRepository } from '../../repositories/glucose.repository';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { clearTimeout } from 'node:timers';
import { GLUCOSE_CONSTANTS } from '../../../../constants/glucose.constants';
import { AxiosResponse } from 'axios';
import { ThrottlerException } from '@nestjs/throttler';
import { lastValueFrom } from 'rxjs';
import {
  DexcomApiDataRangeResponse,
  DexcomApiDevicesResponse,
  DexcomApiEgvsResponse,
} from '../../dto/external/dexcomResponse.dto';
import { GlucoseDexcomTransformer } from './dexcom.transformer';
import { GlucoseProviders } from '../../glucose.enum';

@Injectable()
export class GlucoseDexcomService extends BaseGlucoseService {
  constructor(
    @Inject(GlucoseDexcomConfig) private readonly config: GlucoseDexcomConfig,
    private readonly authService: GlucoseDexcomAuthService,
    private readonly httpService: HttpService,
    private readonly repository: GlucoseRepository,
    private readonly transformer: GlucoseDexcomTransformer,
    @Inject(CACHE_MANAGER) cacheManager: Cache,
  ) {
    super(cacheManager);
  }

  initialize(): void {
    super.initialize();

    try {
      this.config.validate();
      this.isAvailable = true;
      this.logger.debug('Service initialized.');
      this.scheduleFetchGlucose();
    } catch (error) {
      this.isAvailable = false;
      this.logger.error(error instanceof Error ? error.message : error);
    }

    this.isInitialized = true;
  }

  private async ensureFetched(): Promise<void> {
    if (!this.glucoseData) {
      await this.fetchGlucose();
    }
  }

  private async scheduleFetchGlucose() {
    if (!this.isAvailable) return;
    if (this.glucoseFetchTimeout) clearTimeout(this.glucoseFetchTimeout);

    const currentTimestamp = Date.now();
    const rateLimit = await this.cacheManager.get<number>(
      GLUCOSE_CONSTANTS.DEXCOM.CACHE_KEYS.RATELIMIT_FETCH_GLUCOSE,
    );
    this.glucoseRefreshAt =
      currentTimestamp + GLUCOSE_CONSTANTS.DEXCOM.FETCH_TIMEOUT_MS;

    if (rateLimit) {
      this.glucoseRefreshAt =
        currentTimestamp +
        Math.max(GLUCOSE_CONSTANTS.DEXCOM.RETRY_MS, rateLimit - Date.now());
    } else {
      try {
        await this.fetchGlucose();
        const refreshCandidate =
          (this.glucoseData?.currentGlucose.timestamp ?? 0) +
          GLUCOSE_CONSTANTS.DEXCOM.FETCH_TIMEOUT_MS;

        if (
          this.glucoseData?.timestamp &&
          refreshCandidate > currentTimestamp
        ) {
          this.glucoseRefreshAt = refreshCandidate;
        }
      } catch (error) {
        this.glucoseRefreshAt =
          currentTimestamp + GLUCOSE_CONSTANTS.DEXCOM.RETRY_MS;
      }
    }

    const refresh = this.glucoseRefreshAt - currentTimestamp;
    this.glucoseFetchTimeout = setTimeout(
      () => this.scheduleFetchGlucose(),
      refresh,
    );
    this.logger.debug(`Next glucose fetch scheduled in ${refresh} ms`);
  }

  private async handleResponse(response: AxiosResponse): Promise<any> {
    switch (response.status) {
      case 200:
        break;
      case 429:
        const retryAfter: number =
          Number(response.headers['retry-after']) || 60;
        await this.cacheManager.set(
          GLUCOSE_CONSTANTS.DEXCOM.CACHE_KEYS.RATELIMIT_FETCH_GLUCOSE,
          Date.now() + retryAfter * GLUCOSE_CONSTANTS.SEC_TO_MS,
          retryAfter * GLUCOSE_CONSTANTS.SEC_TO_MS,
        );
      default:
        throw new ServiceUnavailableException(
          `Dexcom API error: ${response.status} ${response.statusText} - ${response.data?.fault?.faultString ?? 'No additional error info'}`,
          'SERVICE_UNAVAILABLE',
        );
    }

    const data = response.data;
    if (!data) {
      this.logger.error('Invalid response structure', response.data);
      throw new ServiceUnavailableException(
        'Invalid response structure from Dexcom API.',
        'SERVICE_UNAVAILABLE',
      );
    }

    return data;
  }

  private async fetchGlucose() {
    const promise = this.fetchInProgress;
    if (promise) {
      return await promise;
    }

    this.fetchInProgress = (async () => {
      try {
        const rateLimit = await this.cacheManager.get<number>(
          GLUCOSE_CONSTANTS.DEXCOM.CACHE_KEYS.RATELIMIT_FETCH_GLUCOSE,
        );
        if (rateLimit) {
          throw new ServiceUnavailableException(
            'Dexcom API rate limit exceeded, try again later.',
            'SERVICE_UNAVAILABLE',
          );
        }
        const token = await this.authService.getToken();

        const formatDate = (date: Date): string => {
          const year = date.getUTCFullYear();
          const month = String(date.getUTCMonth() + 1).padStart(2, '0');
          const day = String(date.getUTCDate()).padStart(2, '0');
          const hours = String(date.getUTCHours()).padStart(2, '0');
          const minutes = String(date.getUTCMinutes()).padStart(2, '0');
          const seconds = String(date.getUTCSeconds()).padStart(2, '0');

          return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
        };

        const rangeResponse: AxiosResponse<DexcomApiDataRangeResponse> =
          await lastValueFrom(
            this.httpService.get(
              `${this.config.apiUrl}/${this.config.apiVersion}/users/self/dataRange`,
              {
                headers: {
                  Authorization: token,
                },
                validateStatus: () => true,
              },
            ),
          );

        const dataRange: DexcomApiDataRangeResponse =
          await this.handleResponse(rangeResponse);

        const egvsUrl = new URL(
          `${this.config.apiUrl}/${this.config.apiVersion}/users/self/egvs`,
        );
        egvsUrl.searchParams.append(
          'startDate',
          formatDate(
            new Date(
              new Date(dataRange.egvs.end.systemTime).getTime() -
                12 * 3600 * GLUCOSE_CONSTANTS.SEC_TO_MS,
            ),
          ),
        );
        egvsUrl.searchParams.append('endDate', formatDate(new Date()));
        const egvsResponse: AxiosResponse<DexcomApiEgvsResponse> =
          await lastValueFrom(
            this.httpService.get(egvsUrl.toString(), {
              headers: {
                Authorization: token,
              },
              validateStatus: () => true,
            }),
          );

        const devicesResponse: AxiosResponse<DexcomApiDevicesResponse> =
          await lastValueFrom(
            this.httpService.get(
              `${this.config.apiUrl}/${this.config.apiVersion}/users/self/devices`,
              {
                headers: {
                  Authorization: token,
                },
                validateStatus: () => true,
              },
            ),
          );

        const egvsData = await this.handleResponse(egvsResponse);
        const devicesData = await this.handleResponse(devicesResponse);

        this.glucoseData = this.transformer.transform(egvsData, devicesData);

        if (this.glucoseData?.currentGlucose) {
          await this.repository.saveGlucoseMeasurement({
            provider: GlucoseProviders.DEXCOM,
            unit: this.glucoseData?.unit,
            value: this.glucoseData?.currentGlucose.value,
            timestamp: new Date(this.glucoseData?.currentGlucose.timestamp),
          });
        }
      } catch (error) {
        this.logger.error(error?.message ?? error);
        if (error instanceof HttpException) throw error;
        throw new ServiceUnavailableException(
          'Failed to fetch data from Dexcom API.',
          'SERVICE_UNAVAILABLE',
        );
      } finally {
        this.fetchInProgress = null;
      }
    })();

    return this.fetchInProgress;
  }

  async isSensorActive(): Promise<boolean> {
    this.ensureAvailable();
    await this.ensureFetched();

    if (!this.glucoseData?.sensorData) {
      throw new ServiceUnavailableException(
        'Sensor data is not available.',
        'SENSOR_DATA_UNAVAILABLE',
      );
    }

    return this.glucoseData.sensorData.isActive;
  }

  async getUnit(): Promise<string> {
    this.ensureAvailable();
    await this.ensureFetched();

    if (!this.glucoseData?.unit) {
      throw new ServiceUnavailableException(
        'Glucose unit is not available.',
        'UNIT_UNAVAILABLE',
      );
    }

    return this.glucoseData.unit;
  }

  async getCurrentGlucose(): Promise<GetCurrentGlucoseResponse> {
    this.ensureAvailable();
    await this.ensureFetched();

    if (!this.glucoseData?.currentGlucose) {
      throw new ServiceUnavailableException(
        'Current glucose data is not available.',
        'CURRENT_DATA_UNAVAILABLE',
      );
    }

    return this.glucoseData.currentGlucose;
  }

  async getGraphData(): Promise<GetGraphDataResponse> {
    this.ensureAvailable();
    await this.ensureFetched();

    if (!this.glucoseData?.graphData) {
      throw new ServiceUnavailableException(
        'Glucose graph data is not available.',
        'GRAPH_DATA_UNAVAILABLE',
      );
    }

    return this.glucoseData.graphData;
  }

  async getSensorData(): Promise<GetSensorDataResponse> {
    this.ensureAvailable();
    await this.ensureFetched();

    if (!this.glucoseData?.sensorData) {
      throw new ServiceUnavailableException(
        'Glucose sensor data is not available.',
        'SENSOR_DATA_UNAVAILABLE',
      );
    }

    return this.glucoseData.sensorData;
  }
}
