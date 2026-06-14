import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { TranslatedText } from '../../../common/dto/translated-text.dto';
import { GameQuestionEntity } from './game-question.entity';

@Entity('game_bosses')
export class GameBossEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', length: 80, unique: true })
  slug: string;

  @Column({ type: 'jsonb' })
  name: TranslatedText;

  @Column({ type: 'jsonb' })
  description: TranslatedText;

  @Column({ type: 'boolean', default: false })
  published: boolean;

  @Column({ type: 'integer', default: 15, name: 'max_rounds' })
  maxRounds: number;

  @OneToMany(() => GameQuestionEntity, (question) => question.boss)
  questions: GameQuestionEntity[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
