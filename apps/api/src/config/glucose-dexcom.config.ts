import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IsUrl, validateSync, IsString } from '@nestjs/class-validator';

class GlucoseDexcomConfigDto {
  @IsUrl()
  DEXCOM_API_URL: string;
  @IsString()
  DEXCOM_API_VERSION: string;
  @IsString()
  DEXCOM_CLIENT_ID: string;
  @IsString()
  DEXCOM_CLIENT_SECRET: string;
  @IsString()
  DEXCOM_REDIRECT_URI: string;
}

@Injectable()
export class GlucoseDexcomConfig {
  readonly apiUrl: string;
  readonly apiVersion: string;
  readonly clientId: string;
  readonly clientSecret: string;
  readonly redirectUri: string;

  constructor() {
    const config = plainToInstance(GlucoseDexcomConfigDto, process.env);
    const errors = validateSync(config);

    if (errors.length > 0) {
      throw new Error(`Invalid configuration: ${errors}`);
    }

    this.apiUrl = config.DEXCOM_API_URL;
    this.apiVersion = config.DEXCOM_API_VERSION;
    this.clientId = config.DEXCOM_CLIENT_ID;
    this.clientSecret = config.DEXCOM_CLIENT_SECRET;
    this.redirectUri = config.DEXCOM_REDIRECT_URI;
  }

  public validate(): void {
    if (
      !this.apiUrl ||
      !this.apiVersion ||
      !this.clientId ||
      !this.clientSecret ||
      !this.redirectUri
    ) {
      throw new Error(`${GlucoseDexcomConfig.name} is missing required fields`);
    }
  }
}
