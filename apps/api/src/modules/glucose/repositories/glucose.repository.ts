import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GlucoseEntity } from '../entities/glucose.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { GetTimeInRangeResponse } from '../dto/response/getTimeInRange.dto';
import { GetHighestGlucoseResponse } from '../dto/response/getHighestGlucose.dto';
import { GetLowestGlucoseResponse } from '../dto/response/getLowestGlucose.dto';
import { GetAverageGlucoseResponse } from '../dto/response/getAverageGlucose.dto';
import { SettingsEntity } from '../../../entities/settings.entity';
import { GetGlucoseManagementIndicatorResponse } from '../dto/response/getGlucoseManagementIndicator';
import { GLUCOSE_CONSTANTS } from '../../../constants/glucose.constants';
import { GlucoseUnits } from '../glucose.enum';

@Injectable()
export class GlucoseRepository {
  private readonly logger = new Logger(GlucoseRepository.name);
  constructor(
    @InjectRepository(GlucoseEntity)
    private readonly glucoseRepo: Repository<GlucoseEntity>,
    @InjectRepository(SettingsEntity)
    private readonly settingsRepo: Repository<SettingsEntity>,
  ) {}

  private applyFilters(
    query: SelectQueryBuilder<GlucoseEntity>,
    data: { unit: string; hours?: number; provider?: string },
  ): SelectQueryBuilder<GlucoseEntity> {
    query.where('glucose.unit = :unit', { unit: data.unit });

    if (data.hours) {
      query.andWhere(
        "glucose.timestamp BETWEEN NOW() - (:hours || ' hours')::interval AND NOW()",
        {
          hours: data.hours,
        },
      );
    }

    if (data.provider) {
      query.andWhere('glucose.provider = :provider', {
        provider: data.provider,
      });
    }

    return query;
  }

  async addGlucoseReading(data: {
    value: number;
    unit: string;
    provider: string;
    timestamp: Date;
  }): Promise<void> {
    await this.glucoseRepo.upsert(
      {
        value: data.value,
        unit: data.unit,
        provider: data.provider,
        timestamp: data.timestamp,
      },
      ['timestamp'],
    );
  }

  async getTimeInRange(data: {
    unit: string;
    hours?: number;
    provider?: string;
    targetLow: number;
    targetHigh: number;
    levelLow: number;
    levelHigh: number;
  }): Promise<GetTimeInRangeResponse> {
    try {
      const result = await this.applyFilters(
        this.glucoseRepo
          .createQueryBuilder('glucose')
          .select('COUNT(*)', 'total')
          .addSelect(
            'SUM(CASE WHEN glucose.value > :levelHigh THEN 1 ELSE 0 END)',
            'high',
          )
          .addSelect(
            'SUM(CASE WHEN glucose.value > :targetHigh AND glucose.value <= :levelHigh THEN 1 ELSE 0 END)',
            'aboveRange',
          )
          .addSelect(
            'SUM(CASE WHEN glucose.value >= :targetLow AND glucose.value <= :targetHigh THEN 1 ELSE 0 END)',
            'inRange',
          )
          .addSelect(
            'SUM(CASE WHEN glucose.value >= :levelLow AND glucose.value < :targetLow THEN 1 ELSE 0 END)',
            'belowRange',
          )
          .addSelect(
            'SUM(CASE WHEN glucose.value < :levelLow THEN 1 ELSE 0 END)',
            'low',
          )
          .setParameters({
            targetLow: data.targetLow,
            targetHigh: data.targetHigh,
            levelLow: data.levelLow,
            levelHigh: data.levelHigh,
          }),
        data,
      ).getRawOne();

      const total = parseInt(result.total) || 0;
      const toPercentage = (count: number) => {
        if (total > 0) {
          return Math.round((count / total) * 100);
        }
        return 0;
      };

      const percentageLow = toPercentage(parseInt(result.low));
      const percentageBelowRange = toPercentage(parseInt(result.belowRange));
      const percentageAboveRange = toPercentage(parseInt(result.aboveRange));
      const percentageHigh = toPercentage(parseInt(result.high));
      const percentageInRange =
        100 -
        percentageLow -
        percentageBelowRange -
        percentageAboveRange -
        percentageHigh;

      return {
        isDataSufficient: total > 0,
        percentageLow: percentageLow,
        percentageBelowRange: percentageBelowRange,
        percentageInRange: percentageInRange,
        percentageAboveRange: percentageAboveRange,
        percentageHigh: percentageHigh,
        hours: result.hours,
      };
    } catch (error) {
      this.logger.error('getTimeInRange:', error.message);
      throw new InternalServerErrorException(
        `Failed to retrieve time in range.`,
      );
    }
  }

  async getAverageGlucose(data: {
    unit: string;
    hours?: number;
    provider?: string;
  }): Promise<GetAverageGlucoseResponse> {
    try {
      const result = await this.applyFilters(
        this.glucoseRepo
          .createQueryBuilder('glucose')
          .select('AVG(glucose.value)', 'avg')
          .addSelect('glucose.unit', 'unit')
          .groupBy('glucose.unit'),
        data,
      ).getRawOne();

      const value = result?.avg ? parseInt(result.avg) : 0;

      return {
        isDataSufficient: !!result && value > 0,
        value: value,
        unit: data.unit,
        hours: data.hours || undefined,
      };
    } catch (error) {
      this.logger.error('getAverageGlucose:', error.message);
      throw new InternalServerErrorException(
        `Failed to retrieve average glucose.`,
      );
    }
  }

  async getHighestGlucose(data: {
    unit: string;
    hours?: number;
    provider?: string;
  }): Promise<GetHighestGlucoseResponse> {
    try {
      const result = await this.applyFilters(
        this.glucoseRepo
          .createQueryBuilder('glucose')
          .select('MAX(glucose.value)', 'max'),
        data,
      ).getRawOne();

      const value = result?.max ? parseFloat(result.max) : 0;

      return {
        isDataSufficient: !!result && value > 0,
        value: value,
        unit: data.unit,
        hours: data.hours || undefined,
      };
    } catch (error) {
      this.logger.error('getHighestGlucose:', error.message);
      throw new InternalServerErrorException(
        `Failed to retrieve highest glucose.`,
      );
    }
  }

  async getLowestGlucose(data: {
    unit: string;
    hours?: number;
    provider?: string;
  }): Promise<GetLowestGlucoseResponse> {
    try {
      const result = await this.applyFilters(
        this.glucoseRepo
          .createQueryBuilder('glucose')
          .select('MIN(glucose.value)', 'min'),
        data,
      ).getRawOne();

      const value = result?.min ? parseFloat(result.min) : 0;

      return {
        isDataSufficient: !!result && value > 0,
        value: value,
        unit: data.unit,
        hours: data.hours || undefined,
      };
    } catch (error) {
      this.logger.error('getLowestGlucose:', error.message);
      throw new InternalServerErrorException(
        `Failed to retrieve lowest glucose.`,
      );
    }
  }

  async getGlucoseManagementIndicator(data: {
    unit: string;
    hours?: number;
    provider?: string;
  }): Promise<GetGlucoseManagementIndicatorResponse> {
    try {
      const result = await this.applyFilters(
        this.glucoseRepo
          .createQueryBuilder('glucose')
          .select('AVG(glucose.value)', 'avg')
          .addSelect('COUNT(*)', 'count')
          .addSelect('MIN(glucose.timestamp)', 'minTimestamp'),
        data,
      ).getRawOne();

      const avgGlucose = result?.avg ? parseFloat(result.avg) : 0;
      const count = result?.count ? parseInt(result.count) : 0;

      const minTimestamp = result?.minTimestamp
        ? new Date(result.minTimestamp)
        : null;
      const currentTimestamp = Date.now();
      const dataDuration =
        minTimestamp && currentTimestamp
          ? (currentTimestamp - minTimestamp.getTime()) / (1000 * 3600 * 24)
          : 0;

      const isDataSufficient = dataDuration >= 7 && count > 0;

      let gmiValue: number = 0;
      if (isDataSufficient) {
        if (data.unit === GlucoseUnits.MG_DL) {
          gmiValue = 3.31 + 0.02392 * avgGlucose;
        } else if (data.unit === GlucoseUnits.MMOL_L) {
          gmiValue = 12.71 + 4.70587 * avgGlucose;
        }
      }

      return {
        isDataSufficient,
        value: Number(gmiValue.toFixed(1)),
        hours: data.hours,
      };
    } catch (error) {
      this.logger.error('getGlucoseManagementIndicator:', error.message);
      throw new InternalServerErrorException(
        'Failed to retrieve glucose management indicator.',
      );
    }
  }

  async setSensorProvider(provider: string): Promise<void> {
    const value: Record<string, any> = { provider: provider };

    await this.settingsRepo.upsert(
      {
        code: 'GLUCOSE_PROVIDER',
        label: 'status.glucoseProvider',
        value,
      },
      ['code'],
    );
  }

  async getSensorProvider(): Promise<{ provider: string }> {
    const result = await this.settingsRepo.findOne({
      where: { code: 'GLUCOSE_PROVIDER' },
    });
    const provider: string = result?.value?.provider || 'none';
    return { provider };
  }
}
