import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameSessionEntity } from './game-session.entity';

@Entity('game_participants')
export class GameParticipantEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => GameSessionEntity, (session) => session.participants, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'session_id' })
  session: GameSessionEntity;

  @Column({ type: 'uuid', nullable: true, name: 'user_uuid' })
  userUuid: string | null;

  @Column({ type: 'varchar', length: 40 })
  nickname: string;

  @Column({ type: 'integer' })
  score: number;

  @Column({ type: 'integer', name: 'correct_answers' })
  correctAnswers: number;

  @Column({ type: 'integer', name: 'total_answers' })
  totalAnswers: number;
}
