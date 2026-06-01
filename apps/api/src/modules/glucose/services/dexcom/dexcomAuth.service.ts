import {
  Inject,
  Injectable,
  Logger,
  ServiceUnavailableException,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { GlucoseDexcomConfig } from '../../../../config';
import { BuildDexcomOAuthURLResponse } from '../../dto/response/buildDexcomOAuthURL.dto';
import { HandleDexcomOAuthResponse } from '../../dto/response/handleDexcomOAuth.dto';
import { HandleDexcomOAuthQuery } from '../../dto/input/handleDexcomOAuth.dto';
import { GlucoseDexcomRepository } from '../../repositories/dexcom.repository';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { GLUCOSE_CONSTANTS } from '../../../../constants/glucose.constants';
import {
  DexcomAPI,
  AuthCode,
  RefreshToken,
  AuthCodeResponse,
  RefreshTokenResponse,
} from '../../dto/external/dexcomGeneratedApi';
import { HTTP_CONSTANTS } from '../../../../constants/http.constants';

@Injectable()
export class GlucoseDexcomAuthService {
  private readonly logger = new Logger(GlucoseDexcomAuthService.name);
  private readonly api: DexcomAPI<void>;

  private authFetchWithAuthorisationCodePromise: Promise<string> | null = null;
  private authFetchWithRefreshTokenPromise: Promise<string> | null = null;

  constructor(
    private readonly config: GlucoseDexcomConfig,
    private readonly dexcomRepository: GlucoseDexcomRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.api = new DexcomAPI({
      baseURL: `${this.config.apiUrl}`,
      timeout: HTTP_CONSTANTS.TIMEOUT_MS,
    });
  }

  private async checkRateLimit(ratelimitKey: string): Promise<void> {
    if (await this.cacheManager.get<number>(ratelimitKey)) {
      throw new ServiceUnavailableException(
        'Dexcom API rate limit exceeded',
        'RATELIMIT_EXCEEDED',
      );
    }
  }

  private async handleTokenResponse(
    response: AuthCodeResponse | RefreshTokenResponse,
    refreshToken?: string,
  ): Promise<AuthCodeResponse | RefreshTokenResponse> {
    if (
      !response.access_token ||
      !response.expires_in ||
      !response.token_type ||
      !response.refresh_token
    ) {
      if (refreshToken) {
        await this.dexcomRepository.deleteRefreshToken(refreshToken);
      }
      throw new ServiceUnavailableException(
        'Invalid token response from Dexcom.',
      );
    }
    return response;
  }

  private async storeTokenData(
    data: AuthCodeResponse | RefreshTokenResponse,
  ): Promise<void> {
    await this.dexcomRepository.saveRefreshToken(data.refresh_token!);
    await this.cacheManager.set(
      GLUCOSE_CONSTANTS.DEXCOM.CACHE_KEYS.AUTH_TOKEN,
      `${data.token_type} ${data.access_token}`,
      Math.max(60, data.expires_in! - GLUCOSE_CONSTANTS.DEXCOM.BUFFER_SEC) *
        GLUCOSE_CONSTANTS.SEC_TO_MS,
    );
  }

  private async fetchTokenViaApi(
    tokenRequest: AuthCode | RefreshToken,
  ): Promise<AuthCodeResponse | RefreshTokenResponse> {
    await this.checkRateLimit(
      GLUCOSE_CONSTANTS.DEXCOM.CACHE_KEYS.RATELIMIT_FETCH_TOKEN,
    );
    return (await this.api.v3.postTokenV3(tokenRequest)).data;
  }

  private async validateAndStoreToken(
    response: AuthCodeResponse | RefreshTokenResponse,
    refreshToken?: string,
  ): Promise<string> {
    const data = await this.handleTokenResponse(response, refreshToken);
    await this.storeTokenData(data);
    return `${data.token_type} ${data.access_token}`;
  }

  private async fetchAuthTokenFromRefreshToken(
    refreshToken: string,
  ): Promise<string> {
    if (this.authFetchWithRefreshTokenPromise) {
      return this.authFetchWithRefreshTokenPromise;
    }

    this.authFetchWithRefreshTokenPromise = (async () => {
      try {
        const tokenRequest: RefreshToken = {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
        };
        return await this.validateAndStoreToken(
          await this.fetchTokenViaApi(tokenRequest),
          refreshToken,
        );
      } catch (error) {
        throw error;
      } finally {
        this.authFetchWithRefreshTokenPromise = null;
      }
    })();

    return this.authFetchWithRefreshTokenPromise;
  }

  private async fetchAuthTokenFromAuthorisationCode(
    authorisationCode: string,
  ): Promise<string> {
    if (this.authFetchWithAuthorisationCodePromise) {
      return this.authFetchWithAuthorisationCodePromise;
    }

    this.authFetchWithAuthorisationCodePromise = (async () => {
      try {
        const tokenRequest: AuthCode = {
          grant_type: 'authorization_code',
          code: authorisationCode,
          redirect_uri: this.config.redirectUri,
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
        };
        return await this.validateAndStoreToken(
          await this.fetchTokenViaApi(tokenRequest),
        );
      } catch (error) {
        throw error;
      } finally {
        this.authFetchWithAuthorisationCodePromise = null;
      }
    })();

    return this.authFetchWithAuthorisationCodePromise;
  }

  async getToken(forceRefreshToken: boolean = false): Promise<string> {
    const cachedToken = await this.cacheManager.get<string>(
      GLUCOSE_CONSTANTS.DEXCOM.CACHE_KEYS.AUTH_TOKEN,
    );

    if (!cachedToken || forceRefreshToken) {
      const refreshToken = await this.dexcomRepository.getRefreshToken();
      if (!refreshToken) {
        this.logger.error('No refresh token found in database');
        throw new ServiceUnavailableException(
          'Failed to fetch Dexcom access token using refresh token',
        );
      }

      const tokenRequest: RefreshToken = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
      };

      return await this.fetchAuthTokenFromRefreshToken(refreshToken);
    }

    this.logger.debug('Using cached Dexcom access token');
    return cachedToken;
  }

  buildOAuthURL(): BuildDexcomOAuthURLResponse {
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
    if (query.error) {
      throw new BadRequestException(query.error || 'Authorization error.');
    }
    if (!query.code) {
      throw new BadRequestException('Missing authorization code.');
    }

    const tokenRequest: AuthCode = {
      grant_type: 'authorization_code',
      code: query.code,
      redirect_uri: this.config.redirectUri,
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
    };

    await this.fetchAuthTokenFromAuthorisationCode(query.code);
    return { message: 'Dexcom OAuth successful.' };
  }
}
