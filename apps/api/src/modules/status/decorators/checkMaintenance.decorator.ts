import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ServiceUnavailableException,
  applyDecorators,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { StatusService } from '../services/status.service';
import { ServiceStatus } from '../dto/response/getStatus.dto';

@Injectable()
export class CheckMaintenanceInterceptor implements NestInterceptor {
  constructor(private statusService: StatusService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const statusCheck = await this.statusService.getStatus();

    if (statusCheck.status === ServiceStatus.MAINTENANCE) {
      throw new ServiceUnavailableException(
        'The service is under maintenance',
        'MAINTENANCE_MODE',
      );
    }

    return next.handle();
  }
}

export function CheckMaintenance() {
  return applyDecorators(UseInterceptors(CheckMaintenanceInterceptor));
}
