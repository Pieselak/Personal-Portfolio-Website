import { GlucoseLibreConfig } from './glucose-libre.config';
import { DatabaseConfig } from './database.config';
import { AuthConfig } from './auth.config';
import { GlucoseDexcomConfig } from './glucose-dexcom.config';
import { HttpConfig } from './http.config';
import { CacheConfig } from './cache.config';

export const configProviders = [
  HttpConfig,
  CacheConfig,
  DatabaseConfig,
  AuthConfig,
  GlucoseLibreConfig,
  GlucoseDexcomConfig,
];

export {
  HttpConfig,
  CacheConfig,
  DatabaseConfig,
  AuthConfig,
  GlucoseLibreConfig,
  GlucoseDexcomConfig,
};
