import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { translate } from '../../common/dto/translated-text.dto';
import {
  CreateBossBody,
  CreateQuestionBody,
  ImportGameContentBody,
  ImportGameContentResponse,
  UpdateBossBody,
  UpdateQuestionBody,
} from './dto/game.dto';
import { GameAnswerEntity } from './entities/game-answer.entity';
import { GameBossEntity } from './entities/game-boss.entity';
import { GameParticipantEntity } from './entities/game-participant.entity';
import {
  GameQuestionEntity,
  GameQuestionType,
} from './entities/game-question.entity';
import { GameSessionEntity } from './entities/game-session.entity';
import { GAME_BOSS_SEEDS, GAME_QUESTION_SEEDS, NO, YES } from './game.seed';

@Injectable()
export class GameService implements OnModuleInit {
  constructor(
    @InjectRepository(GameBossEntity)
    private readonly bosses: Repository<GameBossEntity>,
    @InjectRepository(GameQuestionEntity)
    private readonly questions: Repository<GameQuestionEntity>,
    @InjectRepository(GameAnswerEntity)
    private readonly answers: Repository<GameAnswerEntity>,
    @InjectRepository(GameSessionEntity)
    private readonly sessions: Repository<GameSessionEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async onModuleInit(): Promise<void> {
    if ((await this.bosses.count()) > 0) return;
    const bossMap = new Map<string, GameBossEntity>();
    for (const seed of GAME_BOSS_SEEDS) {
      const boss = await this.bosses.save(
        this.bosses.create({
          ...seed,
          published: true,
          maxRounds: 15,
        }),
      );
      bossMap.set(seed.slug, boss);
    }
    for (const seed of GAME_QUESTION_SEEDS) {
      const boss = bossMap.get(seed.boss);
      if (!boss) continue;
      await this.createQuestion({
        bossUuid: boss.uuid,
        content: seed.content,
        explanation: seed.explanation,
        type: GameQuestionType.TRUE_FALSE,
        category: seed.boss,
        difficulty: 1,
        sourceUrl: seed.sourceUrl,
        verifiedAt: '2026-06-14',
        published: true,
        answers: [
          { content: YES, isCorrect: seed.correct },
          { content: NO, isCorrect: !seed.correct },
        ],
      });
    }
  }

  async getPublicBosses(language = 'pl') {
    const bosses = await this.bosses.find({
      where: { published: true },
      order: { createdAt: 'ASC' },
    });
    return Promise.all(
      bosses.map(async (boss) => ({
        uuid: boss.uuid,
        slug: boss.slug,
        name: translate(boss.name, language),
        description: translate(boss.description, language),
        maxRounds: boss.maxRounds,
        questionCount: await this.questions.count({
          where: { boss: { uuid: boss.uuid }, published: true },
        }),
      })),
    );
  }

  getAdminBosses() {
    return this.bosses.find({ order: { createdAt: 'ASC' } });
  }

  createBoss(body: CreateBossBody) {
    return this.bosses.save(this.bosses.create(body));
  }

  async importGameContent(
    body: ImportGameContentBody,
  ): Promise<ImportGameContentResponse> {
    const slugs = body.bosses.map((boss) => boss.slug);
    if (new Set(slugs).size !== slugs.length) {
      throw new BadRequestException('Import contains duplicate boss slugs');
    }

    for (const boss of body.bosses) {
      for (const question of boss.questions) {
        this.validateQuestion(question.type, question.answers);
      }
    }

    return this.dataSource.transaction(async (manager) => {
      const bossRepository = manager.getRepository(GameBossEntity);
      const questionRepository = manager.getRepository(GameQuestionEntity);
      const answerRepository = manager.getRepository(GameAnswerEntity);
      const existing = await bossRepository.find({
        where: { slug: In(slugs) },
        select: { slug: true },
      });

      if (existing.length > 0) {
        throw new ConflictException(
          `Boss slug already exists: ${existing.map((boss) => boss.slug).join(', ')}`,
        );
      }

      const importedBosses: Array<{ uuid: string; slug: string }> = [];
      let questionsImported = 0;

      for (const item of body.bosses) {
        const { questions, ...bossData } = item;
        const boss = await bossRepository.save(bossRepository.create(bossData));
        importedBosses.push({ uuid: boss.uuid, slug: boss.slug });

        for (const questionData of questions) {
          const question = questionRepository.create({
            ...questionData,
            boss,
            published: questionData.published ?? false,
            answers: questionData.answers.map((answer) =>
              answerRepository.create({
                content: answer.content,
                isCorrect: answer.isCorrect,
                orderIndex: answer.orderIndex ?? null,
                matchKey: answer.matchKey ?? null,
              }),
            ),
          });
          await questionRepository.save(question);
          questionsImported += 1;
        }
      }

      return {
        bossesImported: importedBosses.length,
        questionsImported,
        bosses: importedBosses,
      };
    });
  }

  async updateBoss(uuid: string, body: UpdateBossBody) {
    const boss = await this.requireBoss(uuid);
    Object.assign(boss, body);
    return this.bosses.save(boss);
  }

  async deleteBoss(uuid: string) {
    const boss = await this.requireBoss(uuid);
    await this.bosses.remove(boss);
  }

  getAdminQuestions() {
    return this.questions.find({ order: { updatedAt: 'DESC' } });
  }

  async createQuestion(body: CreateQuestionBody) {
    const boss = await this.requireBoss(body.bossUuid);
    this.validateQuestion(body.type, body.answers);
    const question = this.questions.create({
      boss,
      content: body.content,
      explanation: body.explanation,
      type: body.type,
      category: body.category,
      difficulty: body.difficulty,
      sourceUrl: body.sourceUrl,
      verifiedAt: body.verifiedAt,
      published: body.published ?? false,
      answers: body.answers.map((answer) =>
        this.answers.create({
          content: answer.content,
          isCorrect: answer.isCorrect,
          orderIndex: answer.orderIndex ?? null,
          matchKey: answer.matchKey ?? null,
        }),
      ),
    });
    return this.questions.save(question);
  }

  async updateQuestion(uuid: string, body: UpdateQuestionBody) {
    const question = await this.requireQuestion(uuid);
    const type = body.type ?? question.type;
    const answerData =
      body.answers ??
      question.answers.map((answer) => ({
        content: answer.content,
        isCorrect: answer.isCorrect,
        orderIndex: answer.orderIndex ?? undefined,
        matchKey: answer.matchKey ?? undefined,
      }));
    this.validateQuestion(type, answerData);
    if (body.bossUuid) question.boss = await this.requireBoss(body.bossUuid);
    Object.assign(question, {
      ...body,
      bossUuid: undefined,
      answers: body.answers
        ? body.answers.map((answer) =>
            this.answers.create({
              content: answer.content,
              isCorrect: answer.isCorrect,
              orderIndex: answer.orderIndex ?? null,
              matchKey: answer.matchKey ?? null,
            }),
          )
        : question.answers,
      version: question.version + 1,
    });
    return this.questions.save(question);
  }

  async deleteQuestion(uuid: string) {
    const question = await this.requireQuestion(uuid);
    await this.questions.remove(question);
  }

  async getRoundQuestions(bossUuid: string, limit: number) {
    const questions = await this.questions.find({
      where: { boss: { uuid: bossUuid }, published: true },
    });
    if (!questions.length) {
      throw new BadRequestException('Boss has no published questions');
    }
    const shuffled = questions.toSorted(() => Math.random() - 0.5);
    return Array.from(
      { length: limit },
      (_, index) => shuffled[index % shuffled.length],
    );
  }

  serializeQuestion(question: GameQuestionEntity, language: string) {
    return {
      uuid: question.uuid,
      type: question.type,
      category: question.category,
      content: translate(question.content, language),
      answers: question.answers
        .map((answer) => ({
          uuid: answer.uuid,
          content: translate(answer.content, language),
          matchKey:
            question.type === GameQuestionType.MATCHING
              ? answer.matchKey
              : undefined,
        }))
        .toSorted(() => Math.random() - 0.5),
    };
  }

  serializeResolution(question: GameQuestionEntity, language: string) {
    return {
      correctAnswerIds: question.answers
        .filter((answer) => answer.isCorrect)
        .toSorted((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))
        .map((answer) => answer.uuid),
      explanation: translate(question.explanation, language),
      sourceUrl: question.sourceUrl,
    };
  }

  evaluate(
    question: GameQuestionEntity,
    answerIds: string[],
    matches?: Record<string, string>,
  ) {
    if (question.type === GameQuestionType.ORDER) {
      const expected = question.answers
        .toSorted((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))
        .map((answer) => answer.uuid);
      return expected.join('|') === answerIds.join('|');
    }
    if (question.type === GameQuestionType.MATCHING) {
      return question.answers.every(
        (answer) => matches?.[answer.uuid] === answer.matchKey,
      );
    }
    const expected = question.answers
      .filter((answer) => answer.isCorrect)
      .map((answer) => answer.uuid);
    return (
      expected.length === answerIds.length &&
      expected.every((uuid) => answerIds.includes(uuid))
    );
  }

  calculateFinalChallenge(
    bossHp: number,
    bossMaxHp: number,
    playerCount: number,
  ) {
    const remainingRatio =
      bossMaxHp > 0 ? Math.min(1, Math.max(0, bossHp / bossMaxHp)) : 1;

    return {
      requiredHits: Math.ceil(playerCount * (3 + remainingRatio * 5)),
      targetLifetime: Math.round(1300 - remainingRatio * 550),
      duration: 20_000,
    };
  }

  async saveResult(data: {
    bossUuid: string;
    victory: boolean;
    rounds: number;
    players: Array<{
      userUuid?: string;
      nickname: string;
      score: number;
      correctAnswers: number;
      totalAnswers: number;
    }>;
  }) {
    const session = this.sessions.create({
      bossUuid: data.bossUuid,
      victory: data.victory,
      rounds: data.rounds,
      teamScore: data.players.reduce((sum, player) => sum + player.score, 0),
      participants: data.players.map((player) => {
        const participant = new GameParticipantEntity();
        Object.assign(participant, {
          userUuid: player.userUuid ?? null,
          nickname: player.nickname,
          score: player.score,
          correctAnswers: player.correctAnswers,
          totalAnswers: player.totalAnswers,
        });
        return participant;
      }),
    });
    return this.sessions.save(session);
  }

  async getUserHistory(userUuid: string) {
    return this.sessions.find({
      where: { participants: { userUuid } },
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }

  private async requireBoss(uuid: string) {
    const boss = await this.bosses.findOne({ where: { uuid } });
    if (!boss) throw new NotFoundException('Boss not found');
    return boss;
  }

  private async requireQuestion(uuid: string) {
    const question = await this.questions.findOne({ where: { uuid } });
    if (!question) throw new NotFoundException('Question not found');
    return question;
  }

  private validateQuestion(
    type: GameQuestionType,
    answers: Array<{
      isCorrect: boolean;
      orderIndex?: number;
      matchKey?: string;
    }>,
  ) {
    if (
      (type === GameQuestionType.SINGLE_CHOICE ||
        type === GameQuestionType.TRUE_FALSE) &&
      answers.filter((answer) => answer.isCorrect).length !== 1
    ) {
      throw new BadRequestException(
        'Single choice questions require exactly one correct answer',
      );
    }
    if (
      type === GameQuestionType.ORDER &&
      answers.some((answer) => answer.orderIndex === undefined)
    ) {
      throw new BadRequestException('Ordered answers require orderIndex');
    }
    if (
      type === GameQuestionType.MATCHING &&
      answers.some((answer) => !answer.matchKey)
    ) {
      throw new BadRequestException('Matching answers require matchKey');
    }
  }
}
