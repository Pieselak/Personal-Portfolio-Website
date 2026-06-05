import { Controller, Get, Query } from '@nestjs/common';
import { GlucoseDexcomAuthService } from '../services/dexcom/dexcomAuth.service';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HandleDexcomOAuthQuery } from '../dto/input/handleDexcomOAuth.dto';
import { BuildDexcomOAuthURLResponse } from '../dto/response/buildDexcomOAuthURL.dto';
import { HandleDexcomOAuthResponse } from '../dto/response/handleDexcomOAuth.dto';
import { Throttle } from '@nestjs/throttler';
import { CheckMaintenance } from '../../status/decorators/checkMaintenance.decorator';
import { AuthPermissions } from '../../auth/decorators/auth-permissions.decorator';

@Controller('glucose/auth')
@ApiTags('Glucose Authentication')
export class GlucoseAuthController {
  constructor(private readonly dexcomAuthService: GlucoseDexcomAuthService) {}

  @CheckMaintenance()
  @Get('dexcom/url')
  @AuthPermissions('glucose.auth:read')
  @ApiOperation({
    summary: 'Get Dexcom OAuth URL',
    description:
      'Retrieves the OAuth URL for Dexcom authentication. Requires permission: glucose.auth:read',
  })
  @ApiOkResponse({
    type: BuildDexcomOAuthURLResponse,
    description: 'Successfully retrieved Dexcom OAuth URL',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  getDexcomOAuthURL(): BuildDexcomOAuthURLResponse {
    return this.dexcomAuthService.buildOAuthURL();
  }

  @CheckMaintenance()
  @Get('dexcom/callback')
  @AuthPermissions('glucose.auth:authorize')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({
    summary: 'Dexcom OAuth endpoint',
    description:
      'Handles OAuth authentication with Dexcom service. Requires permission: glucose.auth:authorize',
  })
  @ApiOkResponse({
    type: HandleDexcomOAuthResponse,
    description: 'Successfully authenticated with Dexcom',
  })
  @ApiBadRequestResponse({
    description: 'Bad request, possibly due to OAuth error',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiServiceUnavailableResponse({
    description: 'Service is unavailable',
  })
  async handleDexcomOAuth(
    @Query() query: HandleDexcomOAuthQuery,
  ): Promise<HandleDexcomOAuthResponse> {
    return await this.dexcomAuthService.handleOAuth(query);
  }
}
