import { Injectable } from '@nestjs/common';
import { CacheModuleOptions } from '@nestjs/cache-manager';

@Injectable()
export class CacheConfig implements CacheModuleOptions {
  createCacheOptions() {
    return {
      isGlobal: true,
      ttl: 3600000, // 1 hour
    };
  }
}
