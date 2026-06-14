import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GameParticipantEntity } from './game-participant.entity';

@Entity('game_sessions')
export class GameSessionEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'uuid', name: 'boss_uuid' })
  bossUuid: string;

  @Column({ type: 'boolean' })
  victory: boolean;

  @Column({ type: 'integer' })
  rounds: number;

  @Column({ type: 'integer', name: 'team_score' })
  teamScore: number;

  @OneToMany(
    () => GameParticipantEntity,
    (participant) => participant.session,
    {
      cascade: true,
      eager: true,
    },
  )
  participants: GameParticipantEntity[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;
}
