import { Body, Controller, Get, Patch } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { StatusService } from '../services/status.service';
import { StatusCheckResponse } from '../dto/response/getStatus.dto';
import { MaintenanceModeResponse } from '../dto/response/setMaintenanceMode.dto';
import { MaintenanceModeInput } from '../dto/input/setMaintenanceMode.dto';
import { AuthPermissions } from '../../auth/decorators/auth-permissions.decorator';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  @ApiOperation({
    summary: 'Check service status',
    description: 'Checks the current operational status of the service.',
  })
  @ApiOkResponse({
    type: StatusCheckResponse,
    description: 'Service status check response',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async getStatus(): Promise<StatusCheckResponse> {
    return await this.statusService.getStatus();
  }

  @Patch('maintenance')
  @AuthPermissions('status.maintenance:update')
  @ApiOperation({
    summary: 'Update maintenance mode',
    description:
      'Enables or disables maintenance mode for the service. Requires permission: status.maintenance:update',
  })
  @ApiOkResponse({
    type: MaintenanceModeResponse,
    description: 'Maintenance mode updated successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden, insufficient permissions',
  })
  async setMaintenanceMode(
    @Body() body: MaintenanceModeInput,
  ): Promise<MaintenanceModeResponse> {
    return await this.statusService.setMaintenanceMode(body);
  }
}
