import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IsUrl, IsString, validateSync } from '@nestjs/class-validator';

class GlucoseLibreConfigDto {
  @IsUrl()
  LIBRE_API_URL: string;
  @IsString()
  LIBRE_VERSION: string;
  @IsString()
  LIBRE_PRODUCT: string;
  @IsString()
  LIBRE_ACCOUNT_ID: string;
  @IsString()
  LIBRE_EMAIL: string;
  @IsString()
  LIBRE_PASSWORD: string;
}

@Injectable()
export class GlucoseLibreConfig {
  readonly apiUrl: string;
  readonly version: string;
  readonly product: string;
  readonly accountId: string;
  readonly email: string;
  readonly password: string;

  constructor() {
    const config = plainToInstance(GlucoseLibreConfigDto, process.env);
    const errors = validateSync(config);

    if (errors.length > 0) {
      throw new Error(`Invalid configuration: ${errors}`);
    }

    this.apiUrl = config.LIBRE_API_URL;
    this.version = config.LIBRE_VERSION;
    this.product = config.LIBRE_PRODUCT;
    this.accountId = config.LIBRE_ACCOUNT_ID;
    this.email = config.LIBRE_EMAIL;
    this.password = config.LIBRE_PASSWORD;
  }

  public validate(): void {
    if (
      !this.apiUrl ||
      !this.version ||
      !this.product ||
      !this.accountId ||
      !this.email ||
      !this.password
    ) {
      throw new Error(`${GlucoseLibreConfig.name} is missing required fields`);
    }
  }
}
