import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { TranslatedText } from '../../../common/dto/translated-text.dto';
import { GameQuestionEntity } from './game-question.entity';

@Entity('game_answers')
export class GameAnswerEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => GameQuestionEntity, (question) => question.answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'question_id' })
  question: GameQuestionEntity;

  @Column({ type: 'jsonb' })
  content: TranslatedText;

  @Column({ type: 'boolean', default: false, name: 'is_correct' })
  isCorrect: boolean;

  @Column({ type: 'integer', nullable: true, name: 'order_index' })
  orderIndex: number | null;

  @Column({ type: 'varchar', length: 80, nullable: true, name: 'match_key' })
  matchKey: string | null;
}
