import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, tap } from 'rxjs';
import { Repository } from 'typeorm';
import { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
import { AuditLogEntity } from './audit-log.entity';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(AuditLogEntity)
    private readonly repository: Repository<AuditLogEntity>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') return next.handle();
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    if (!['POST', 'PATCH', 'PUT', 'DELETE'].includes(request.method)) {
      return next.handle();
    }
    return next.handle().pipe(
      tap(() => {
        void this.repository.save(
          this.repository.create({
            userUuid: request.user?.uuid ?? null,
            method: request.method,
            resource: request.originalUrl.slice(0, 500),
            action: `${request.method} ${request.path}`.slice(0, 100),
          }),
        );
      }),
    );
  }
}
