import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  ServiceStatus,
  StatusCheckResponse,
} from '../dto/response/getStatus.dto';
import { StatusRepository } from '../repositories/status.repository';
import { MaintenanceModeInput } from '../dto/input/setMaintenanceMode.dto';
import { MaintenanceModeResponse } from '../dto/response/setMaintenanceMode.dto';

@Injectable()
export class StatusService {
  constructor(private readonly repository: StatusRepository) {}

  async getStatus(): Promise<StatusCheckResponse> {
    let operationalStatus = ServiceStatus.OPERATIONAL;

    const maintenance = await this.repository.getMaintenanceStatus();
    if (maintenance && maintenance.enabled) {
      operationalStatus = ServiceStatus.MAINTENANCE;
    }

    return {
      status: operationalStatus,
      uptime: process.uptime(),
      timestamp: Number(Date.now()),
    };
  }

  async setMaintenanceMode(
    body: MaintenanceModeInput,
  ): Promise<MaintenanceModeResponse> {
    try {
      const maintenanceSetting = await this.repository.getMaintenanceStatus();
      if (maintenanceSetting && maintenanceSetting.enabled === body.enable) {
        return {
          enabled: maintenanceSetting.enabled,
          message: `Maintenance mode is already ${
            body.enable ? 'enabled' : 'disabled'
          }.`,
        };
      }

      await this.repository.saveMaintenanceStatus(body.enable);
      return {
        enabled: body.enable,
        message: `Maintenance mode has been ${
          body.enable ? 'enabled' : 'disabled'
        }.`,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update maintenance mode.',
      );
    }
  }
}
