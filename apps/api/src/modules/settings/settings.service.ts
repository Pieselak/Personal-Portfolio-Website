import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingsEntity } from '../../entities/settings.entity';
import { GameSettingsResponse } from './settings.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SettingsEntity)
    private readonly repository: Repository<SettingsEntity>,
  ) {}

  async getGameSettings(): Promise<GameSettingsResponse> {
    const setting = await this.repository.findOne({
      where: { code: 'game.module' },
    });
    return { enabled: setting?.value?.enabled !== false };
  }

  async updateGameSettings(enabled: boolean): Promise<GameSettingsResponse> {
    await this.repository.upsert(
      {
        code: 'game.module',
        label: 'game.module',
        value: { enabled } as Record<string, any>,
      },
      ['code'],
    );
    return { enabled };
  }
}
