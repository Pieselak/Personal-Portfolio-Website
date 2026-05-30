import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '../../config/config.module';

import { GlucoseController } from './controllers/glucose.controller';
import { GlucoseAuthController } from './controllers/glucoseAuth.controller';
import { GlucoseStatisticsController } from './controllers/glucoseStatistics.controller';
import { GlucoseSettingsController } from './controllers/glucoseSettings.controller';

import { GlucoseService } from './services/glucose.service';
import { GlucoseLibreService } from './services/libre/libre.service';
import { GlucoseLibreAuthService } from './services/libre/libreAuth.service';
import { GlucoseLibreTransformer } from './services/libre/libre.transformer';
import { GlucoseDexcomService } from './services/dexcom/dexcom.service';
import { GlucoseDexcomAuthService } from './services/dexcom/dexcomAuth.service';
import { GlucoseDexcomTransformer } from './services/dexcom/dexcom.transformer';

import { DexcomEntity } from './entities/dexcom.entity';
import { GlucoseEntity } from './entities/glucose.entity';
import { SettingsEntity } from '../../entities/settings.entity';

import { GlucoseDexcomRepository } from './repositories/dexcom.repository';
import { GlucoseRepository } from './repositories/glucose.repository';
import { CacheConfig, HttpConfig } from '../../config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      useClass: HttpConfig,
    }),
    CacheModule.registerAsync({
      useClass: CacheConfig,
    }),
    TypeOrmModule.forFeature([SettingsEntity, DexcomEntity, GlucoseEntity]),
  ],
  controllers: [
    GlucoseController,
    GlucoseAuthController,
    GlucoseSettingsController,
    GlucoseStatisticsController,
  ],
  providers: [
    GlucoseService,
    GlucoseLibreService,
    GlucoseLibreAuthService,
    GlucoseLibreTransformer,
    GlucoseDexcomService,
    GlucoseDexcomAuthService,
    GlucoseDexcomTransformer,
    GlucoseDexcomRepository,
    GlucoseRepository,
  ],
})
export class GlucoseModule {}
