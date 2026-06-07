import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import { GlucoseLibreService } from './libre/libre.service';
import { GlucoseDexcomService } from './dexcom/dexcom.service';
import { GetCurrentGlucoseResponse } from '../dto/response/getCurrentGlucose.dto';
import { GetGraphDataResponse } from '../dto/response/getGraphData.dto';
import { GetSensorDataResponse } from '../dto/response/getSensorData.dto';
import { GetTimeInRangeResponse } from '../dto/response/getTimeInRange.dto';
import { GetAverageGlucoseResponse } from '../dto/response/getAverageGlucose.dto';
import { GetHighestGlucoseResponse } from '../dto/response/getHighestGlucose.dto';
import { GetLowestGlucoseResponse } from '../dto/response/getLowestGlucose.dto';
import { GetTimeInRangeQuery } from '../dto/input/getTimeInRange.dto';
import { GetAverageGlucoseQuery } from '../dto/input/getAverageGlucose.dto';
import { GlucoseRepository } from '../repositories/glucose.repository';
import { GLUCOSE_CONSTANTS } from '../../../constants/glucose.constants';
import { BaseGlucoseService } from '../glucose.types';
import { GetProviderModesResponse } from '../dto/response/getProviderModes.dto';
import { SetProviderModeBody } from '../dto/input/setProviderMode.dto';
import { SetProviderModeResponse } from '../dto/response/setProviderMode.dto';
import { GetGlucoseManagementIndicatorQuery } from '../dto/input/getGlucoseManagementIndicator';
import { GetGlucoseManagementIndicatorResponse } from '../dto/response/getGlucoseManagementIndicator';
import {
  GlucoseColors,
  GlucoseProviders,
  GlucoseSensors,
  GlucoseStatus,
  GlucoseTrends,
} from '../glucose.enum';
import {
  GetGlucoseAvailabilityResponse,
  GlucoseAvailabilityReason,
  GlucoseProviderMode,
} from '../dto/response/getGlucoseAvailability.dto';

@Injectable()
export class GlucoseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(GlucoseService.name);
  private readonly glucoseServiceMap: Record<string, BaseGlucoseService> = {};

  private isAvailable = false;
  private sensorProviderMode: GlucoseProviderMode | null = null;
  private selectedGlucoseService: BaseGlucoseService | null = null;
  private selectedProviderName: GlucoseProviders | null = null;
  private providerCheckerInterval: NodeJS.Timeout | null = null;

  constructor(
    private readonly repository: GlucoseRepository,
    private readonly libreService: GlucoseLibreService,
    private readonly dexcomService: GlucoseDexcomService,
  ) {
    this.glucoseServiceMap['libre'] = this.libreService;
    this.glucoseServiceMap['dexcom'] = this.dexcomService;
  }

  async onModuleInit() {
    try {
      this.sensorProviderMode = (await this.repository.getSensorProvider())
        .provider as GlucoseProviderMode;

      this.providerCheckerInterval = setInterval(async () => {
        const currentProvider = await this.repository.getSensorProvider();
        if (currentProvider.provider !== this.sensorProviderMode) {
          this.logger.debug(
            `Glucose provider changed from ${this.sensorProviderMode} to ${currentProvider.provider}. Reinitializing...`,
          );
          this.onModuleDestroy();
          await this.onModuleInit();
        } else if (currentProvider.provider === 'auto') {
          if (
            this.selectedGlucoseService &&
            !(await this.selectedGlucoseService.isSensorActive())
          ) {
            this.logger.debug(
              `Selected glucose provider ${this.sensorProviderMode} is no longer active. Reinitializing...`,
            );
            this.onModuleDestroy();
            await this.onModuleInit();
          }
        }
      }, GLUCOSE_CONSTANTS.PROVIDER_CHECK_INTERVAL_MS);

      if (this.sensorProviderMode == 'none') {
        this.isAvailable = true;
        this.selectedGlucoseService = null;
        this.logger.warn('Glucose module is disabled by configuration.');
        return;
      } else if (this.sensorProviderMode == 'auto') {
        for (const glucoseServiceMapKey in this.glucoseServiceMap) {
          const service = this.glucoseServiceMap[glucoseServiceMapKey];
          try {
            service.initialize();
            const isActive = await service.isSensorActive();
            if (isActive) {
              this.selectedGlucoseService = service;
              this.selectedProviderName = glucoseServiceMapKey as GlucoseProviders;
              this.logger.log(
                `Auto-detected glucose provider: ${glucoseServiceMapKey}`,
              );
              break;
            }
            service.onModuleDestroy();
          } catch (error) {
            throw new ServiceUnavailableException(
              `Error checking glucose provider ${glucoseServiceMapKey}: ${
                error instanceof Error ? error.message : error
              }`,
            );
          }
        }
        if (!this.selectedGlucoseService) {
          throw new ServiceUnavailableException(
            'No active glucose sensor found for auto provider.',
          );
        }
      } else if (this.glucoseServiceMap[this.sensorProviderMode]) {
        this.selectedProviderName = this.sensorProviderMode as GlucoseProviders;
        this.selectedGlucoseService =
          this.glucoseServiceMap[this.sensorProviderMode];
      } else {
        throw new ServiceUnavailableException('Invalid glucose provider.');
      }

      this.isAvailable = true;
      this.selectedGlucoseService.initialize();
      this.logger.log(
        `Glucose module initialized with provider: ${this.sensorProviderMode}${this.sensorProviderMode === 'auto' ? ` (${this.selectedProviderName})` : ''}.`,
      );
    } catch (error) {
      this.isAvailable = false;
      this.logger.error(error instanceof Error ? error.message : error);
    }
  }

  onModuleDestroy() {
    this.isAvailable = false;
    if (this.providerCheckerInterval) {
      clearInterval(this.providerCheckerInterval);
      this.providerCheckerInterval = null;
    }
    if (this.selectedGlucoseService) {
      this.selectedGlucoseService.onModuleDestroy();
    }
    this.selectedGlucoseService = null;
  }

  private ensureAvailable(): void {
    if (!this.isAvailable) {
      throw new ServiceUnavailableException(
        'Glucose module is not available.',
        'MODULE_UNAVAILABLE',
      );
    }
    if (this.sensorProviderMode === 'none') {
      throw new ServiceUnavailableException(
        'Glucose module is disabled.',
        'MODULE_DISABLED',
      );
    }
    if (!this.selectedGlucoseService) {
      throw new ServiceUnavailableException(
        'Glucose module has no active provider.',
        'MODULE_NO_PROVIDER',
      );
    }
  }

  getAvailability(): GetGlucoseAvailabilityResponse {
    const configuredProvider = this.sensorProviderMode ?? 'none';
    const enabled = configuredProvider !== 'none';
    const hasProvider = enabled && !!this.selectedGlucoseService;

    let reason = GlucoseAvailabilityReason.AVAILABLE;
    if (!enabled) {
      reason = GlucoseAvailabilityReason.MODULE_DISABLED;
    } else if (!this.isAvailable && !hasProvider) {
      reason = configuredProvider === 'auto'
        ? GlucoseAvailabilityReason.NO_PROVIDER
        : GlucoseAvailabilityReason.INITIALIZING;
    } else if (!hasProvider) {
      reason = GlucoseAvailabilityReason.NO_PROVIDER;
    }

    return {
      enabled,
      hasProvider,
      configuredProvider,
      activeProvider: this.selectedProviderName ?? undefined,
      reason,
    };
  }

  async getCurrentGlucose(): Promise<GetCurrentGlucoseResponse> {
    this.ensureAvailable();

    return this.selectedGlucoseService!.getCurrentGlucose();
  }

  async getGraphData(): Promise<GetGraphDataResponse> {
    this.ensureAvailable();

    return this.selectedGlucoseService!.getGraphData();
  }

  async getSensorData(): Promise<GetSensorDataResponse> {
    this.ensureAvailable();

    return this.selectedGlucoseService!.getSensorData();
  }

  async getTimeInRange(
    params: GetTimeInRangeQuery,
  ): Promise<GetTimeInRangeResponse> {
    this.ensureAvailable();

    const unit = await this.selectedGlucoseService!.getUnit();

    return await this.repository.getTimeInRange({
      unit: unit,
      hours: params.hours,
      provider: this.selectedProviderName || undefined,
      // Temporary hardcoded values until user-specific targets are implemented
      targetLow: 80,
      targetHigh: 180,
      levelLow: 70,
      levelHigh: 230,
    });
  }

  async getAverageGlucose(
    params: GetAverageGlucoseQuery,
  ): Promise<GetAverageGlucoseResponse> {
    this.ensureAvailable();

    const unit = await this.selectedGlucoseService!.getUnit();

    return await this.repository.getAverageGlucose({
      unit: unit,
      hours: params.hours,
      provider: this.selectedProviderName || undefined,
    });
  }

  async getHighestGlucose(
    params: GetAverageGlucoseQuery,
  ): Promise<GetHighestGlucoseResponse> {
    this.ensureAvailable();

    const unit = await this.selectedGlucoseService!.getUnit();

    return await this.repository.getHighestGlucose({
      unit: unit,
      hours: params.hours,
      provider: this.selectedProviderName || undefined,
    });
  }

  async getLowestGlucose(
    params: GetAverageGlucoseQuery,
  ): Promise<GetLowestGlucoseResponse> {
    this.ensureAvailable();

    const unit = await this.selectedGlucoseService!.getUnit();

    return await this.repository.getLowestGlucose({
      unit: unit,
      hours: params.hours,
      provider: this.selectedProviderName || undefined,
    });
  }

  async getGlucoseManagementIndicator(
    params: GetGlucoseManagementIndicatorQuery,
  ): Promise<GetGlucoseManagementIndicatorResponse> {
    this.ensureAvailable();

    const unit = await this.selectedGlucoseService!.getUnit();

    return await this.repository.getGlucoseManagementIndicator({
      unit: unit,
      hours: params.hours,
      provider: this.selectedProviderName || undefined,
    });
  }

  async getProviderModes(): Promise<GetProviderModesResponse> {
    const currentProvider = await this.repository.getSensorProvider();
    const providers = Object.keys(this.glucoseServiceMap);
    providers.unshift('none', 'auto');

    const modes = providers.map((mode) => ({
      name: mode,
      selected: mode === currentProvider.provider,
    }));

    return { providers: modes };
  }

  async setProviderMode(
    body: SetProviderModeBody,
  ): Promise<SetProviderModeResponse> {
    const providers = Object.keys(this.glucoseServiceMap);
    providers.unshift('none', 'auto');
    if (!providers.includes(body.provider)) {
      throw new BadRequestException('Invalid glucose provider.');
    }

    const providerSetting = await this.repository.getSensorProvider();
    if (providerSetting && providerSetting.provider === body.provider) {
      return {
        provider: providerSetting.provider,
        message: `Provider mode is already set to ${body.provider}`,
      };
    }

    try {
      await this.repository.setSensorProvider(body.provider);
      return {
        provider: body.provider,
        message: `Provider mode has been set to ${body.provider}.`,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update provider mode.');
    }
  }
}
