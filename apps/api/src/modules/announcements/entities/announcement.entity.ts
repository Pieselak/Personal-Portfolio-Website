import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { TranslatedText } from '../../../common/dto/translated-text.dto';

export enum AnnouncementVariant {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
}

@Entity('announcements')
export class AnnouncementEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'jsonb' })
  title: TranslatedText;

  @Column({ type: 'jsonb' })
  content: TranslatedText;

  @Column({ type: 'jsonb', nullable: true, name: 'action_label' })
  actionLabel: TranslatedText | null;

  @Column({ type: 'varchar', length: 500, nullable: true, name: 'action_url' })
  actionUrl: string | null;

  @Column({ type: 'varchar', length: 20, default: AnnouncementVariant.INFO })
  variant: AnnouncementVariant;

  @Column({ type: 'boolean', default: true })
  dismissible: boolean;

  @Column({ type: 'boolean', default: false })
  published: boolean;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
