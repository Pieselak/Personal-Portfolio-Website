import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { RedisConfig } from '../../../config';

@Injectable()
export class TokenBlacklistService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(TokenBlacklistService.name);
  private client: RedisClientType;
  private connected = false;

  constructor(private readonly redisConfig: RedisConfig) {}

  async onModuleInit(): Promise<void> {
    this.client = createClient({
      socket: {
        host: this.redisConfig.host,
        port: this.redisConfig.port,
      },
      password: this.redisConfig.password,
    });

    this.client.on('error', (error: Error) => {
      this.connected = false;
      this.logger.error(`Redis connection error: ${error.message}`);
    });

    try {
      await this.client.connect();
      this.connected = true;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);

      if (this.redisConfig.required) {
        throw new Error(`Redis connection failed: ${message}`);
      }

      this.logger.warn(
        `Redis is unavailable, JWT blacklist is disabled: ${message}`,
      );
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.client?.isOpen) {
      await this.client.quit();
    }
  }

  async blacklistToken(tokenId: string, expiresAt?: number): Promise<void> {
    const ttl = expiresAt ? expiresAt - Math.floor(Date.now() / 1000) : 0;

    if (ttl <= 0) {
      return;
    }

    if (!this.connected) {
      return;
    }

    await this.client.set(this.getKey(tokenId), 'revoked', { EX: ttl });
  }

  async isBlacklisted(tokenId: string): Promise<boolean> {
    if (!this.connected) {
      return false;
    }

    const result = await this.client.get(this.getKey(tokenId));
    return result !== null;
  }

  private getKey(tokenId: string): string {
    return `auth:token-blacklist:${tokenId}`;
  }
}
