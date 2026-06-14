import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SettingsModule } from '../settings/settings.module';
import { UsersModule } from '../users/users.module';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { GameAnswerEntity } from './entities/game-answer.entity';
import { GameBossEntity } from './entities/game-boss.entity';
import { GameParticipantEntity } from './entities/game-participant.entity';
import { GameQuestionEntity } from './entities/game-question.entity';
import { GameSessionEntity } from './entities/game-session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GameBossEntity,
      GameQuestionEntity,
      GameAnswerEntity,
      GameSessionEntity,
      GameParticipantEntity,
    ]),
    AuthModule,
    UsersModule,
    SettingsModule,
  ],
  controllers: [GameController],
  providers: [GameService, GameGateway],
})
export class GameModule {}
