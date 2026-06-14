import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from './config/config.module';
import { StatusModule } from './modules/status/status.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { GlucoseModule } from './modules/glucose/glucose.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AnnouncementsModule } from './modules/announcements/announcements.module';
import { SettingsModule } from './modules/settings/settings.module';
import { GameModule } from './modules/game/game.module';
import { AuditModule } from './modules/audit/audit.module';

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    UsersModule,
    AuthModule,
    StatusModule,
    ProjectsModule,
    GlucoseModule,
    AnnouncementsModule,
    SettingsModule,
    GameModule,
    AuditModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
