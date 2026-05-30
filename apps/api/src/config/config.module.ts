import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { configProviders, DatabaseConfig } from './index';
import { HttpConfig } from './http.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    HttpModule.registerAsync({ useClass: HttpConfig }),
    TypeOrmModule.forRootAsync({ useClass: DatabaseConfig }),
  ],
  providers: configProviders,
  exports: configProviders,
})
export class ConfigModule {}
