import { GetCurrentGlucoseResponse } from './dto/response/getCurrentGlucose.dto';
import { GetGraphDataResponse } from './dto/response/getGraphData.dto';
import { GetSensorDataResponse } from './dto/response/getSensorData.dto';
import { clearTimeout } from 'node:timers';
import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export abstract class BaseGlucoseService implements OnModuleDestroy {
  protected readonly logger = new Logger(this.constructor.name);

  protected isAvailable = false;
  protected isInitialized = false;
  protected fetchInProgress: Promise<any> | null = null;

  protected glucoseFetchTimeout: NodeJS.Timeout | null = null;
  protected glucoseData: GlucoseData | null = null;
  protected glucoseRefreshAt: number | null = null;

  constructor(@Inject(CACHE_MANAGER) protected cacheManager: Cache) {}

  abstract isSensorActive(): Promise<boolean>;
  abstract getUnit(): Promise<string>;
  abstract getCurrentGlucose(): Promise<any>;
  abstract getGraphData(): Promise<any>;
  abstract getSensorData(): Promise<any>;

  initialize(): void {
    if (this.isInitialized) {
      this.logger.debug('Service already initialized.');
      return;
    }
  }

  onModuleDestroy(): void {
    this.isInitialized = false;
    this.isAvailable = false;
    this.fetchInProgress = null;
    if (this.glucoseFetchTimeout) {
      clearTimeout(this.glucoseFetchTimeout);
    }
    this.glucoseData = null;
    this.glucoseRefreshAt = null;
    this.logger.debug('Service destroyed and resources cleaned up.');
  }

  protected ensureAvailable(): void {
    if (!this.isInitialized) {
      throw new ServiceUnavailableException(
        `${this.constructor.name} is not initialized.`,
        'SERVICE_NOT_INITIALIZED',
      );
    }
    if (!this.isAvailable) {
      throw new ServiceUnavailableException(
        `${this.constructor.name} is not available.`,
        'SERVICE_UNAVAILABLE',
      );
    }
  }

  protected getRefreshAt(): number {
    return this.glucoseRefreshAt ?? 0;
  }

  protected getRefreshIn(): number {
    return Math.max(0, this.getRefreshAt() - Date.now());
  }
}

export interface GlucoseData {
  timestamp: number;
  unit: string;
  currentGlucose: GetCurrentGlucoseResponse;
  graphData: GetGraphDataResponse;
  sensorData: GetSensorDataResponse;
}
