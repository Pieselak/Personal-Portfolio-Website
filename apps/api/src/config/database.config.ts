import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { IsString, validateSync } from '@nestjs/class-validator';
import { plainToClass } from 'class-transformer';
import pg from 'pg';
import { GameAdminPlatform1760000000000 } from '../migrations/1760000000000-GameAdminPlatform';
import { UserBlockingAndAnnouncementCleanup1760000001000 } from '../migrations/1760000001000-UserBlockingAndAnnouncementCleanup';
import { EnsureRoleSystemColumn1760000002000 } from '../migrations/1760000002000-EnsureRoleSystemColumn';

class DatabaseConfigDto {
  @IsString()
  DATABASE_URL: string;
}

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  readonly databaseUrl: string;

  constructor() {
    const config = plainToClass(DatabaseConfigDto, process.env);
    const errors = validateSync(config);

    if (errors.length > 0) {
      throw new Error(`Invalid configuration: ${JSON.stringify(errors)}`);
    }

    this.databaseUrl = config.DATABASE_URL;
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.databaseUrl,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [
        GameAdminPlatform1760000000000,
        UserBlockingAndAnnouncementCleanup1760000001000,
        EnsureRoleSystemColumn1760000002000,
      ],
      migrationsRun: process.env.NODE_ENV !== 'localdevelopment',
      synchronize: process.env.NODE_ENV === 'localdevelopment',
      driver: pg,
    };
  }
}
