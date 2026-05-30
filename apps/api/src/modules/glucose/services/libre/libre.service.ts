import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ThrottlerException } from '@nestjs/throttler';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { clearTimeout } from 'node:timers';
import { GlucoseProviders } from '../../glucose.enum';
import { GLUCOSE_CONSTANTS } from '../../../../constants/glucose.constants';
import { GlucoseLibreConfig } from '../../../../config';
import { GetCurrentGlucoseResponse } from '../../dto/response/getCurrentGlucose.dto';
import { GetGraphDataResponse } from '../../dto/response/getGraphData.dto';
import { GetSensorDataResponse } from '../../dto/response/getSensorData.dto';
import { GlucoseLibreAuthService } from './libreAuth.service';
import { GlucoseRepository } from '../../repositories/glucose.repository';
import { GlucoseLibreTransformer } from './libre.transformer';
import { BaseGlucoseService } from '../../glucose.types';
import { LibreApiResponse } from '../../dto/external/libreResponse.dto';

@Injectable()
export class GlucoseLibreService extends BaseGlucoseService {
  constructor(
    @Inject(GlucoseLibreConfig) private readonly config: GlucoseLibreConfig,
    private readonly authService: GlucoseLibreAuthService,
    private readonly httpService: HttpService,
    private readonly repository: GlucoseRepository,
    private readonly transformer: GlucoseLibreTransformer,
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
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
      GLUCOSE_CONSTANTS.LIBRE.CACHE_KEYS.RATELIMIT_FETCH_GLUCOSE,
    );
    this.glucoseRefreshAt =
      currentTimestamp + GLUCOSE_CONSTANTS.LIBRE.FETCH_TIMEOUT_MS;

    if (rateLimit) {
      this.glucoseRefreshAt =
        currentTimestamp +
        Math.max(GLUCOSE_CONSTANTS.LIBRE.RETRY_MS, rateLimit - Date.now());
    } else {
      try {
        await this.fetchGlucose();
        const refreshCandidate =
          (this.glucoseData?.currentGlucose.timestamp ?? 0) +
          GLUCOSE_CONSTANTS.LIBRE.FETCH_TIMEOUT_MS;

        if (
          this.glucoseData?.timestamp &&
          refreshCandidate > currentTimestamp
        ) {
          this.glucoseRefreshAt = refreshCandidate;
        }
      } catch (error) {
        this.glucoseRefreshAt =
          currentTimestamp + GLUCOSE_CONSTANTS.LIBRE.RETRY_MS;
      }
    }

    const refresh = this.glucoseRefreshAt - currentTimestamp;
    this.glucoseFetchTimeout = setTimeout(
      () => this.scheduleFetchGlucose(),
      refresh, // refresh,
    );
    this.logger.debug(`Next glucose fetch scheduled in ${refresh} ms`);
  }

  private async handleResponse(
    response: AxiosResponse,
  ): Promise<LibreApiResponse> {
    switch (response.status) {
      case 200:
        break;
      case 429:
        const retryAfter: number =
          Number(response.headers['retry-after']) || 60;
        await this.cacheManager.set(
          GLUCOSE_CONSTANTS.LIBRE.CACHE_KEYS.RATELIMIT_FETCH_GLUCOSE,
          Date.now() + retryAfter * GLUCOSE_CONSTANTS.SEC_TO_MS,
          retryAfter * GLUCOSE_CONSTANTS.SEC_TO_MS,
        );
        throw new ServiceUnavailableException(
          `Libre API error: ${response.status} ${response.statusText} - ${response.data?.message ?? 'No additional error info'}`,
          'SERVICE_UNAVAILABLE',
        );
    }

    const data = response.data?.data;
    if (!data) {
      this.logger.error('Invalid response structure', response.data);
      throw new ServiceUnavailableException(
        'Invalid response structure from Libre API.',
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
          GLUCOSE_CONSTANTS.LIBRE.CACHE_KEYS.RATELIMIT_FETCH_GLUCOSE,
        );
        if (rateLimit) {
          throw new ServiceUnavailableException(
            `Libre API rate limit exceeded, try again later.`,
            'SERVICE_UNAVAILABLE',
          );
        }
        const { token, patientId } = await this.authService.getToken();
        const response: AxiosResponse<LibreApiResponse> = await lastValueFrom(
          this.httpService.get(
            `${this.config.apiUrl}/connections/${patientId}/graph`,
            {
              headers: {
                Authorization: token,
                product: this.config.product,
                version: this.config.version,
                'account-id': this.config.accountId,
              },
              validateStatus: () => true,
            },
          ),
        );

        const data = await this.handleResponse(response);
        this.glucoseData = this.transformer.transform(data);

        if (this.glucoseData?.currentGlucose) {
          await this.repository.saveGlucoseMeasurement({
            provider: GlucoseProviders.LIBRE,
            unit: this.glucoseData?.unit,
            value: this.glucoseData?.currentGlucose.value,
            timestamp: new Date(this.glucoseData?.currentGlucose.timestamp),
          });
        }
      } catch (error) {
        this.logger.error(error?.message ?? error);
        if (error instanceof HttpException) throw error;
        throw new ServiceUnavailableException(
          'Failed to fetch data from Libre API.',
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

    const response = this.glucoseData.currentGlucose;
    response.refreshAt = this.getRefreshAt();
    response.refreshIn = this.getRefreshIn();
    return response;
  }

  async getGraphData(): Promise<GetGraphDataResponse> {
    this.ensureAvailable();
    await this.ensureFetched();

    if (!this.glucoseData?.graphData) {
      throw new ServiceUnavailableException(
        'Graph data is not available.',
        'GRAPH_DATA_UNAVAILABLE',
      );
    }

    const response = this.glucoseData.graphData;
    response.refreshAt = this.getRefreshAt();
    response.refreshIn = this.getRefreshIn();
    return response;
  }

  async getSensorData(): Promise<GetSensorDataResponse> {
    this.ensureAvailable();
    await this.ensureFetched();

    if (!this.glucoseData?.sensorData) {
      throw new ServiceUnavailableException(
        'Sensor data is not available.',
        'SENSOR_DATA_UNAVAILABLE',
      );
    }

    return this.glucoseData.sensorData;
  }
}
