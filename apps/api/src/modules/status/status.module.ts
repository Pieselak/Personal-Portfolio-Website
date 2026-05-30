import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscoveryService } from '@nestjs/core';
import { StatusController } from './controllers/status.controller';
import { StatusService } from './services/status.service';
import { StatusRepository } from './repositories/status.repository';
import { SettingsEntity } from '../../entities/settings.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([SettingsEntity])],
  controllers: [StatusController],
  providers: [StatusService, StatusRepository],
  exports: [StatusService],
})
export class StatusModule {}
