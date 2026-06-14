import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditInterceptor } from './audit.interceptor';
import { AuditLogEntity } from './audit-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLogEntity])],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
})
export class AuditModule {}
