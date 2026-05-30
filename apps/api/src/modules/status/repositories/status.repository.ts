import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingsEntity } from '../../../entities/settings.entity';

@Injectable()
export class StatusRepository {
  constructor(
    @InjectRepository(SettingsEntity)
    private readonly settingsRepo: Repository<SettingsEntity>,
  ) {}

  async saveMaintenanceStatus(enable: boolean): Promise<void> {
    const value = JSON.stringify({ enabled: enable });
    const existing = await this.settingsRepo.findOne({
      where: { code: 'MAINTENANCE' },
    });
    if (existing) {
      existing.value = value;
      await this.settingsRepo.save(existing);
    } else {
      const setting = this.settingsRepo.create({
        code: 'MAINTENANCE',
        label: 'status.maintenance',
        value,
      });
      await this.settingsRepo.save(setting);
    }
  }

  async getMaintenanceStatus(): Promise<{ enabled: boolean }> {
    const result = await this.settingsRepo.findOne({
      where: { code: 'MAINTENANCE' },
    });
    const enabled = result?.value ? JSON.parse(result.value).enabled : false;
    return { enabled };
  }
}
