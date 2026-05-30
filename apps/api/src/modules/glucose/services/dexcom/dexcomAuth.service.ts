import {
  Inject,
  Injectable,
  Logger,
  ServiceUnavailableException,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { GlucoseDexcomConfig } from '../../../../config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { BuildDexcomOAuthURLResponse } from '../../dto/response/buildDexcomOAuthURL.dto';
import { HandleDexcomOAuthResponse } from '../../dto/response/handleDexcomOAuth.dto';
import { HandleDexcomOAuthQuery } from '../../dto/input/handleDexcomOAuth.dto';
import { GlucoseDexcomRepository } from '../../repositories/dexcom.repository';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { GLUCOSE_CONSTANTS } from '../../../../constants/glucose.constants';
import { ThrottlerException } from '@nestjs/throttler';
import { AxiosResponse } from 'axios';

interface DexcomTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token: string;
  refresh_expires_in: number;
  session_state?: string;
}

enum DexcomTokenGrantType {
  AUTHORIZATION_CODE = 'authorization_code',
  REFRESH_TOKEN = 'refresh_token',
}

@Injectable()
export class GlucoseDexcomAuthService {
  private readonly logger = new Logger(GlucoseDexcomAuthService.name);
  private readonly RATE_LIMIT_KEYS = {
    FETCH_ACCESS_TOKEN: 'dexcomFetchAccessToken',
    FETCH_ACCESS_RATELIMIT: 'dexcomFetchAccessRateLimit',
  };

  private initFail = false;
  private authFetchPromise: Promise<string> | null = null;

  constructor(
    private readonly config: GlucoseDexcomConfig,
    private readonly dexcomRepository: GlucoseDexcomRepository,
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private ensureAvailable(): void {
    if (this.initFail) {
      throw new ServiceUnavailableException(
        'Glucose Dexcom auth service is not available.',
      );
    }
  }

  private async buildTokenParams(
    type: DexcomTokenGrantType,
    code?: string,
  ): Promise<URLSearchParams> {
    const params = new URLSearchParams();
    params.append('client_id', this.config.clientId);
    params.append('client_secret', this.config.clientSecret);
    params.append('grant_type', type);

    if (type === DexcomTokenGrantType.AUTHORIZATION_CODE) {
      if (!code) {
        throw new BadRequestException('Authorization code is required.');
      }
      params.append('code', code);
      params.append('redirect_uri', this.config.redirectUri);
    } else if (type === DexcomTokenGrantType.REFRESH_TOKEN) {
      const refresh_token = await this.dexcomRepository.getRefreshToken();
      if (!refresh_token) {
        throw new ServiceUnavailableException('Refresh token not found');
      }
      params.append('refresh_token', refresh_token);
    } else {
      throw new BadRequestException('Invalid token grant type.');
    }

    return params;
  }

  private async handleTokenResponse(
    response: AxiosResponse<DexcomTokenResponse>,
    refreshToken?: string,
  ): Promise<DexcomTokenResponse> {
    switch (response.status) {
      case 200:
        break;
      case 400:
        if (refreshToken) {
          await this.dexcomRepository.deleteRefreshToken(refreshToken);
          throw new BadRequestException('Invalid refresh token.');
        }
        throw new BadRequestException('Invalid request.');
      case 429:
        const retryAfter: number =
          Number(response.headers['retry-after']) || 60;
        await this.cacheManager.set(
          this.RATE_LIMIT_KEYS.FETCH_ACCESS_RATELIMIT,
          Date.now() + retryAfter * GLUCOSE_CONSTANTS.SEC_TO_MS,
          retryAfter * GLUCOSE_CONSTANTS.SEC_TO_MS,
        );
        throw new ThrottlerException(
          `Rate limit exceeded, retry after ${retryAfter} seconds.`,
        );
      default:
        throw new ServiceUnavailableException(
          'Dexcom token endpoint is unavailable.',
        );
    }

    const data: DexcomTokenResponse = response.data;
    if (
      !data.access_token ||
      !data.expires_in ||
      !data.token_type ||
      !data.refresh_token
    ) {
      throw new ServiceUnavailableException(
        'Invalid token response from Dexcom.',
      );
    }

    return data;
  }

  private async storeTokenData(data: DexcomTokenResponse): Promise<void> {
    await this.dexcomRepository.saveRefreshToken(data.refresh_token);
    await this.cacheManager.set(
      GLUCOSE_CONSTANTS.DEXCOM.CACHE_KEYS.AUTH_TOKEN,
      `${data.token_type} ${data.access_token}`,
      Math.max(60, data.expires_in - GLUCOSE_CONSTANTS.DEXCOM.BUFFER_SEC) *
        GLUCOSE_CONSTANTS.SEC_TO_MS,
    );
  }

  private async fetchToken(
    type: DexcomTokenGrantType,
    code?: string,
  ): Promise<string> {
    this.ensureAvailable();
    if (this.authFetchPromise) {
      return this.authFetchPromise;
    }

    this.authFetchPromise = (async () => {
      const params = await this.buildTokenParams(type, code);
      try {
        const rateLimit = await this.cacheManager.get<number>(
          this.RATE_LIMIT_KEYS.FETCH_ACCESS_RATELIMIT,
        );
        if (rateLimit) {
          throw new ThrottlerException(
            `Rate limit exceeded, try in ${Math.max(0, rateLimit - Date.now())} seconds.`,
          );
        }

        const response = await lastValueFrom(
          this.httpService.post<DexcomTokenResponse>(
            `${this.config.apiUrl}/${this.config.apiVersion}/oauth2/token`,
            params.toString(),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              validateStatus: () => true,
            },
          ),
        );

        const data = await this.handleTokenResponse(
          response,
          params.get('refresh_token') || undefined,
        );

        await this.storeTokenData(data);
        return `${data.token_type} ${data.access_token}`;
      } catch (error) {
        this.logger.error(
          `Error fetching Dexcom access token: ${error?.message ?? error}`,
        );
        if (error instanceof HttpException) throw error;
        throw new ServiceUnavailableException(
          'Failed to fetch Dexcom access token.',
          error,
        );
      } finally {
        this.authFetchPromise = null;
      }
    })();

    return this.authFetchPromise;
  }

  private async fetchTokenWithCode(code: string): Promise<string> {
    this.logger.debug(
      'Fetching new Dexcom access token using authorization code',
    );
    return this.fetchToken(DexcomTokenGrantType.AUTHORIZATION_CODE, code);
  }

  private async refreshToken(): Promise<string> {
    this.logger.debug('Fetching new Dexcom access token using refresh token');
    return this.fetchToken(DexcomTokenGrantType.REFRESH_TOKEN);
  }

  async getToken(regenerateToken: boolean = false): Promise<string> {
    this.ensureAvailable();
    const cachedToken = await this.cacheManager.get<string>(
      GLUCOSE_CONSTANTS.DEXCOM.CACHE_KEYS.AUTH_TOKEN,
    );
    if (!cachedToken || regenerateToken) {
      return await this.refreshToken();
    }
    this.logger.debug('Using cached Dexcom access token');
    return cachedToken;
  }

  buildOAuthURL(): BuildDexcomOAuthURLResponse {
    this.ensureAvailable();

    const params = new URLSearchParams();
    params.append('client_id', this.config.clientId);
    params.append('redirect_uri', this.config.redirectUri);
    params.append('response_type', 'code');
    params.append('scope', 'offline_access');

    return {
      url: `${this.config.apiUrl}/${this.config.apiVersion}/oauth2/login?${params.toString()}`,
    };
  }

  async handleOAuth(
    query: HandleDexcomOAuthQuery,
  ): Promise<HandleDexcomOAuthResponse> {
    this.ensureAvailable();
    if (query.error) {
      throw new BadRequestException(query.error || 'Authorization error.');
    }
    if (!query.code) {
      throw new BadRequestException('Missing authorization code.');
    }

    await this.fetchTokenWithCode(query.code);
    return { message: 'Dexcom OAuth successful.' };
  }
}
