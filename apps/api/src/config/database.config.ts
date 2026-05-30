import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { IsString, validateSync } from '@nestjs/class-validator';
import { plainToClass } from 'class-transformer';

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
      throw new Error(`Invalid configuration: ${errors}`);
    }

    this.databaseUrl = config.DATABASE_URL;
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.databaseUrl,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      driver: require('pg'),
    };
  }
}
