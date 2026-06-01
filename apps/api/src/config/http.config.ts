import { Injectable } from '@nestjs/common';
import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { HTTP_CONSTANTS } from '../constants/http.constants';

@Injectable()
export class HttpConfig implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: HTTP_CONSTANTS.TIMEOUT_MS,
      maxRedirects: HTTP_CONSTANTS.MAX_REDIRECT_COUNT,
    };
  }
}
