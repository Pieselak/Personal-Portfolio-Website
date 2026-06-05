import { Body, Controller, Get, Patch } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GlucoseService } from '../services/glucose.service';
import { SetProviderModeBody } from '../dto/input/setProviderMode.dto';
import { SetProviderModeResponse } from '../dto/response/setProviderMode.dto';
import { GetProviderModesResponse } from '../dto/response/getProviderModes.dto';
import { AuthPermissions } from '../../auth/decorators/auth-permissions.decorator';

@Controller('glucose/settings')
@ApiTags('Glucose Settings')
export class GlucoseSettingsController {
  constructor(private readonly glucoseService: GlucoseService) {}

  @Get('providers')
  @AuthPermissions('glucose.settings:read')
  @ApiOperation({
    summary: 'Get available glucose data providers',
    description:
      'List of available glucose data providers. Requires permission: glucose.settings:read',
  })
  @ApiOkResponse({
    type: GetProviderModesResponse,
    description: 'List of glucose data providers',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, insufficient permissions',
  })
  async getProviderModes(): Promise<GetProviderModesResponse> {
    return await this.glucoseService.getProviderModes();
  }

  @Patch('provider')
  @AuthPermissions('glucose.settings:update')
  @ApiOperation({
    summary: 'Update glucose data provider mode',
    description:
      'Set the mode for glucose data provider. Supported modes include "auto", "libre", "dexcom". Requires permission: glucose.settings:update',
  })
  @ApiOkResponse({
    type: SetProviderModeResponse,
    description: 'Glucose provider mode updated successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, insufficient permissions',
  })
  async setProviderMode(
    @Body() body: SetProviderModeBody,
  ): Promise<SetProviderModeResponse> {
    return await this.glucoseService.setProviderMode(body);
  }
}
