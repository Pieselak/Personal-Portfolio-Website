import { Injectable } from '@nestjs/common';
import {
  IsBooleanString,
  IsNumberString,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { plainToClass } from 'class-transformer';

class RedisConfigDto {
  @IsString()
  REDIS_HOST: string;

  @IsNumberString()
  REDIS_PORT: string;

  @IsOptional()
  @IsString()
  REDIS_PASSWORD?: string;

  @IsOptional()
  @IsBooleanString()
  REDIS_REQUIRED?: string;
}

@Injectable()
export class RedisConfig {
  readonly host: string;
  readonly port: number;
  readonly password?: string;
  readonly required: boolean;

  constructor() {
    const config = plainToClass(RedisConfigDto, process.env);
    const errors = validateSync(config);

    if (errors.length > 0) {
      throw new Error(`Invalid redis configuration: ${JSON.stringify(errors)}`);
    }

    this.host = config.REDIS_HOST;
    this.port = Number(config.REDIS_PORT);
    this.password = config.REDIS_PASSWORD || undefined;
    this.required =
      config.REDIS_REQUIRED !== undefined
        ? config.REDIS_REQUIRED === 'true'
        : process.env.NODE_ENV !== 'localdevelopment';
  }
}
