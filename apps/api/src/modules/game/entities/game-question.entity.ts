import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { TranslatedText } from '../../../common/dto/translated-text.dto';
import { GameAnswerEntity } from './game-answer.entity';
import { GameBossEntity } from './game-boss.entity';

export enum GameQuestionType {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  ORDER = 'ORDER',
  MATCHING = 'MATCHING',
}

@Entity('game_questions')
export class GameQuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => GameBossEntity, (boss) => boss.questions, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'boss_id' })
  boss: GameBossEntity;

  @Column({ type: 'jsonb' })
  content: TranslatedText;

  @Column({ type: 'jsonb' })
  explanation: TranslatedText;

  @Column({ type: 'varchar', length: 30 })
  type: GameQuestionType;

  @Column({ type: 'varchar', length: 80 })
  category: string;

  @Column({ type: 'integer', default: 1 })
  difficulty: number;

  @Column({ type: 'varchar', length: 500, name: 'source_url' })
  sourceUrl: string;

  @Column({ type: 'date', name: 'verified_at' })
  verifiedAt: string;

  @Column({ type: 'boolean', default: false })
  published: boolean;

  @Column({ type: 'integer', default: 1 })
  version: number;

  @OneToMany(() => GameAnswerEntity, (answer) => answer.question, {
    cascade: true,
    eager: true,
  })
  answers: GameAnswerEntity[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
