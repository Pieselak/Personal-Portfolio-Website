import {
  BadRequestException,
  HttpException,
  Inject,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { GlucoseLibreConfig } from '../../../../config';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { ThrottlerException } from '@nestjs/throttler';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { GLUCOSE_CONSTANTS } from '../../../../constants/glucose.constants';

interface LibreTokenResponse {
  data: {
    user: {
      id: string;
    };
    authTicket: {
      token: string;
      expires: number;
      duration: number;
    };
  };
}

interface TokenResponse {
  token: string;
  patientId: string;
}

export class GlucoseLibreAuthService {
  private readonly logger = new Logger(GlucoseLibreAuthService.name);

  private initFail = false;
  private authFetchPromise: Promise<TokenResponse> | null = null;

  constructor(
    private readonly config: GlucoseLibreConfig,
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private ensureAvailable(): void {
    if (this.initFail) {
      throw new ServiceUnavailableException(
        'Glucose Libre auth service is not available.',
      );
    }
  }

  private async handleTokenResponse(
    response: AxiosResponse<LibreTokenResponse>,
  ): Promise<LibreTokenResponse> {
    switch (response.status) {
      case 200:
        break;
      case 400:
        throw new BadRequestException('Invalid request.');
      case 429:
        const retryAfter: number =
          Number(response.headers['retry-after']) || 60;
        await this.cacheManager.set(
          GLUCOSE_CONSTANTS.LIBRE.CACHE_KEYS.RATELIMIT_FETCH_TOKEN,
          Date.now() + retryAfter * GLUCOSE_CONSTANTS.SEC_TO_MS,
          retryAfter * GLUCOSE_CONSTANTS.SEC_TO_MS,
        );
        throw new ThrottlerException(
          `Rate limit exceeded, retry after ${retryAfter} seconds.`,
        );
      default:
        throw new ServiceUnavailableException(
          'Libre token endpoint is unavailable.',
        );
    }

    const data: LibreTokenResponse = response.data;
    console.log(data);
    if (
      !data.data.authTicket.token ||
      !data.data.authTicket.expires ||
      !data.data.authTicket.duration
    ) {
      throw new ServiceUnavailableException(
        'Invalid token response from Libre.',
      );
    }

    return data;
  }

  private async storeTokenData(data: LibreTokenResponse): Promise<void> {
    await this.cacheManager.set(
      GLUCOSE_CONSTANTS.LIBRE.CACHE_KEYS.AUTH_TOKEN,
      {
        token: `Bearer ${data.data.authTicket.token}`,
        patientId: data.data.user.id,
      },
      Math.max(
        60,
        data.data.authTicket.duration - GLUCOSE_CONSTANTS.LIBRE.BUFFER_SEC,
      ) * GLUCOSE_CONSTANTS.SEC_TO_MS,
    );
  }

  private async fetchToken(): Promise<TokenResponse> {
    this.ensureAvailable();
    if (this.authFetchPromise) {
      this.logger.debug('Using ongoing Libre auth token fetch promise');
      return this.authFetchPromise;
    }

    this.authFetchPromise = (async () => {
      this.logger.debug('Fetching new Libre auth token');
      try {
        const rateLimit = await this.cacheManager.get<number>(
          GLUCOSE_CONSTANTS.LIBRE.CACHE_KEYS.RATELIMIT_FETCH_TOKEN,
        );
        if (rateLimit) {
          throw new ThrottlerException(
            `Rate limit exceeded, try in ${Math.max(0, rateLimit - Date.now())} seconds.`,
          );
        }

        const response = await lastValueFrom(
          this.httpService.post(
            `${this.config.apiUrl}/auth/login`,
            {
              email: this.config.email,
              password: this.config.password,
            },
            {
              headers: {
                product: this.config.product,
                version: this.config.version,
              },
              validateStatus: () => true,
            },
          ),
        );

        const data = await this.handleTokenResponse(response);

        await this.storeTokenData(data);
        return {
          token: `Bearer ${data.data.authTicket.token}`,
          patientId: data.data.user.id,
        };
      } catch (error) {
        this.logger.error(
          `Error fetching Libre access token: ${error?.message ?? error}`,
        );
        if (error instanceof HttpException) throw error;
        throw new ServiceUnavailableException(
          'Failed to fetch Libre access token.',
          error,
        );
      } finally {
        this.authFetchPromise = null;
      }
    })();

    return this.authFetchPromise;
  }

  async getToken(regenerateToken: boolean = false): Promise<TokenResponse> {
    this.ensureAvailable();
    const cachedToken = await this.cacheManager.get<TokenResponse>(
      GLUCOSE_CONSTANTS.LIBRE.CACHE_KEYS.AUTH_TOKEN,
    );
    if (!cachedToken || regenerateToken) {
      return await this.fetchToken();
    }
    this.logger.debug('Using cached Libre auth token');
    return cachedToken;
  }
}
