import { Injectable } from '@nestjs/common';
import type { JwtSignOptions } from '@nestjs/jwt';
import { IsString, validateSync } from '@nestjs/class-validator';
import { plainToClass } from 'class-transformer';

class AuthConfigDto {
  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRES_IN: string;
}

@Injectable()
export class AuthConfig {
  readonly jwtSecret: string;
  readonly jwtExpiresIn: JwtSignOptions['expiresIn'];

  constructor() {
    const config = plainToClass(AuthConfigDto, process.env);
    const errors = validateSync(config);

    if (errors.length > 0) {
      throw new Error(`Invalid auth configuration: ${JSON.stringify(errors)}`);
    }

    this.jwtSecret = config.JWT_SECRET;
    this.jwtExpiresIn = config.JWT_EXPIRES_IN as JwtSignOptions['expiresIn'];
  }
}
