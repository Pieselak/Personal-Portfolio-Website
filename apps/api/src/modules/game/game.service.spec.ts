import { DataSource, Repository } from 'typeorm';
import { GameAnswerEntity } from './entities/game-answer.entity';
import { GameBossEntity } from './entities/game-boss.entity';
import {
  GameQuestionEntity,
  GameQuestionType,
} from './entities/game-question.entity';
import { GameSessionEntity } from './entities/game-session.entity';
import { GameService } from './game.service';

describe('GameService', () => {
  const repository = {} as Repository<never>;
  const service = new GameService(
    repository as Repository<GameBossEntity>,
    repository as Repository<GameQuestionEntity>,
    repository as Repository<GameAnswerEntity>,
    repository as Repository<GameSessionEntity>,
    {} as DataSource,
  );

  function question(
    type: GameQuestionType,
    answers: Array<Partial<GameAnswerEntity> & { uuid: string }>,
  ): GameQuestionEntity {
    return { type, answers } as GameQuestionEntity;
  }

  it('evaluates a single choice answer', () => {
    const value = question(GameQuestionType.SINGLE_CHOICE, [
      { uuid: 'a', isCorrect: true },
      { uuid: 'b', isCorrect: false },
    ]);
    expect(service.evaluate(value, ['a'])).toBe(true);
    expect(service.evaluate(value, ['b'])).toBe(false);
  });

  it('requires the exact order for ordered questions', () => {
    const value = question(GameQuestionType.ORDER, [
      { uuid: 'a', orderIndex: 0 },
      { uuid: 'b', orderIndex: 1 },
    ]);
    expect(service.evaluate(value, ['a', 'b'])).toBe(true);
    expect(service.evaluate(value, ['b', 'a'])).toBe(false);
  });

  it('validates every matching pair', () => {
    const value = question(GameQuestionType.MATCHING, [
      { uuid: 'a', matchKey: '1' },
      { uuid: 'b', matchKey: '2' },
    ]);
    expect(service.evaluate(value, [], { a: '1', b: '2' })).toBe(true);
    expect(service.evaluate(value, [], { a: '2', b: '1' })).toBe(false);
  });

  it('makes the final challenge easier after the boss is weakened', () => {
    const strongBoss = service.calculateFinalChallenge(900, 1000, 2);
    const weakBoss = service.calculateFinalChallenge(100, 1000, 2);

    expect(weakBoss.requiredHits).toBeLessThan(strongBoss.requiredHits);
    expect(weakBoss.targetLifetime).toBeGreaterThan(strongBoss.targetLifetime);
  });
});
