import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { DefaultEventsMap, Namespace, Socket } from 'socket.io';
import { UsersService } from '../users/services/users.service';
import {
  CreateRoomPayload,
  FinalStrikePayload,
  JoinRoomPayload,
  SubmitAnswerPayload,
} from './dto/game.dto';
import { GameQuestionEntity } from './entities/game-question.entity';
import { GameService } from './game.service';
import { SettingsService } from '../settings/settings.service';

type PlayerState = {
  id: string;
  socketId: string;
  userUuid?: string;
  nickname: string;
  ready: boolean;
  connected: boolean;
  score: number;
  correctAnswers: number;
  totalAnswers: number;
  answered: boolean;
};

type GameSocketData = {
  playerId: string;
  userUuid?: string;
};

type GameSocket = Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  GameSocketData
>;

type RoomState = {
  code: string;
  hostId: string;
  bossUuid: string;
  language: string;
  phase: 'LOBBY' | 'PLAYING' | 'FINAL' | 'FINISHED';
  players: Map<string, PlayerState>;
  questions: GameQuestionEntity[];
  round: number;
  bossHp: number;
  bossMaxHp: number;
  roundStartedAt: number;
  roundResolved: boolean;
  finalHits: number;
  finalRequiredHits: number;
  finalEndsAt: number;
  finalTargetLifetime: number;
  finalTarget?: {
    id: string;
    x: number;
    y: number;
    expiresAt: number;
  };
  finalHitPlayers: Set<string>;
  timer?: NodeJS.Timeout;
  targetTimer?: NodeJS.Timeout;
};

@WebSocketGateway({
  namespace: '/game',
  cors: { origin: true, credentials: true },
  connectionStateRecovery: {
    maxDisconnectionDuration: 120_000,
    skipMiddlewares: false,
  },
})
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  namespace: Namespace;

  private readonly rooms = new Map<string, RoomState>();

  constructor(
    private readonly gameService: GameService,
    private readonly settingsService: SettingsService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  getActivePlayerCount(): number {
    return [...this.rooms.values()].reduce(
      (total, room) =>
        total +
        [...room.players.values()].filter((player) => player.connected).length,
      0,
    );
  }

  async handleConnection(socket: GameSocket) {
    const token = socket.handshake.auth?.token as string | undefined;
    const playerId =
      (socket.handshake.auth?.playerId as string | undefined) ?? randomUUID();
    socket.data.playerId = playerId;
    if (!token) return;
    try {
      const payload = await this.jwtService.verifyAsync<{ sub: string }>(token);
      const user = await this.usersService.findUserByUuid(payload.sub);
      if (!this.usersService.isUserAccessAllowed(user)) {
        throw new Error('inactive or blocked');
      }
      socket.data.userUuid = user.uuid;
    } catch {
      socket.disconnect(true);
    }
  }

  handleDisconnect(socket: GameSocket) {
    const room = this.findRoomByPlayer(socket.data.playerId);
    const player = room?.players.get(socket.data.playerId);
    if (!room || !player) return;
    player.connected = false;
    this.emitState(room);
    setTimeout(() => {
      const current = room.players.get(player.id);
      if (!current || current.connected) return;
      room.players.delete(player.id);
      if (room.hostId === player.id) {
        room.hostId = room.players.keys().next().value ?? '';
      }
      if (room.players.size === 0) this.rooms.delete(room.code);
      else this.emitState(room);
    }, 120_000);
  }

  @SubscribeMessage('room:create')
  async createRoom(
    @ConnectedSocket() socket: GameSocket,
    @MessageBody() payload: CreateRoomPayload,
  ) {
    if (!(await this.settingsService.getGameSettings()).enabled) {
      throw new WsException('Game module is disabled');
    }
    const bosses = await this.gameService.getPublicBosses(
      payload.language ?? 'pl',
    );
    if (!bosses.some((boss) => boss.uuid === payload.bossUuid)) {
      throw new WsException('Boss is unavailable');
    }
    const code = this.createCode();
    const player = this.createPlayer(socket, payload.nickname);
    const room: RoomState = {
      code,
      hostId: player.id,
      bossUuid: payload.bossUuid,
      language: payload.language ?? 'pl',
      phase: 'LOBBY',
      players: new Map([[player.id, player]]),
      questions: [],
      round: 0,
      bossHp: 0,
      bossMaxHp: 0,
      roundStartedAt: 0,
      roundResolved: false,
      finalHits: 0,
      finalRequiredHits: 0,
      finalEndsAt: 0,
      finalTargetLifetime: 0,
      finalHitPlayers: new Set(),
    };
    this.rooms.set(code, room);
    await socket.join(code);
    this.emitState(room);
    return { code, playerId: player.id };
  }

  @SubscribeMessage('room:join')
  async joinRoom(
    @ConnectedSocket() socket: GameSocket,
    @MessageBody() payload: JoinRoomPayload,
  ) {
    const room = this.rooms.get(payload.code.toUpperCase());
    if (!room) throw new WsException('Room not found');
    if (room.phase !== 'LOBBY') throw new WsException('Game already started');
    if (room.players.size >= 3) throw new WsException('Room is full');
    const existing = room.players.get(socket.data.playerId);
    const player = existing ?? this.createPlayer(socket, payload.nickname);
    player.socketId = socket.id;
    player.connected = true;
    room.players.set(player.id, player);
    await socket.join(room.code);
    this.emitState(room);
    return { code: room.code, playerId: player.id };
  }

  @SubscribeMessage('room:resume')
  async resumeRoom(@ConnectedSocket() socket: GameSocket) {
    const room = this.findRoomByPlayer(socket.data.playerId);
    const player = room?.players.get(socket.data.playerId);
    if (!room || !player) throw new WsException('Session expired');
    player.connected = true;
    player.socketId = socket.id;
    await socket.join(room.code);
    this.emitState(room);
    if (room.phase === 'PLAYING') {
      this.emitRound(room, socket);
      if (room.roundResolved) this.emitResolution(room, socket);
    }
    if (room.phase === 'FINAL') this.emitFinal(room, socket);
    return { code: room.code };
  }

  @SubscribeMessage('player:ready')
  setReady(
    @ConnectedSocket() socket: GameSocket,
    @MessageBody() payload: { ready: boolean },
  ) {
    const { room, player } = this.requireMembership(socket);
    if (room.phase !== 'LOBBY') throw new WsException('Game already started');
    player.ready = Boolean(payload.ready);
    this.emitState(room);
    return { ready: player.ready };
  }

  @SubscribeMessage('game:start')
  async startGame(@ConnectedSocket() socket: GameSocket) {
    const { room, player } = this.requireMembership(socket);
    if (room.hostId !== player.id) throw new WsException('Host only action');
    if ([...room.players.values()].some((item) => !item.ready)) {
      throw new WsException('All players must be ready');
    }
    room.questions = await this.gameService.getRoundQuestions(
      room.bossUuid,
      15,
    );
    room.phase = 'PLAYING';
    room.round = 0;
    room.bossMaxHp = room.players.size * 1000;
    room.bossHp = room.bossMaxHp;
    room.roundResolved = false;
    this.emitState(room);
    this.startRound(room);
    return { started: true };
  }

  @SubscribeMessage('answer:submit')
  submitAnswer(
    @ConnectedSocket() socket: GameSocket,
    @MessageBody() payload: SubmitAnswerPayload,
  ) {
    const { room, player } = this.requireMembership(socket);
    if (room.phase !== 'PLAYING' || player.answered) {
      throw new WsException('Answer is not accepted');
    }
    const question = room.questions[room.round];
    if (!question || Date.now() - room.roundStartedAt > 25_000) {
      throw new WsException('Round has ended');
    }
    const correct = this.gameService.evaluate(
      question,
      payload.answerIds,
      payload.matches,
    );
    player.answered = true;
    player.totalAnswers += 1;
    if (correct) {
      const elapsed = Date.now() - room.roundStartedAt;
      const speedBonus = Math.max(0, Math.round(50 * (1 - elapsed / 25_000)));
      player.score += 100 + speedBonus;
      player.correctAnswers += 1;
      room.bossHp = Math.max(1, room.bossHp - 100);
    }
    this.namespace.to(socket.id).emit('answer:accepted', { correct });
    if ([...room.players.values()].every((item) => item.answered)) {
      this.resolveRound(room);
    } else {
      this.emitState(room);
    }
    return { accepted: true };
  }

  @SubscribeMessage('round:next')
  nextRound(@ConnectedSocket() socket: GameSocket) {
    const { room, player } = this.requireMembership(socket);
    if (room.hostId !== player.id) throw new WsException('Host only action');
    if (room.phase !== 'PLAYING' || !room.roundResolved) {
      throw new WsException('Round review is not active');
    }

    room.round += 1;
    if (room.round >= room.questions.length) {
      this.startFinal(room);
      return { phase: 'FINAL' };
    }

    this.startRound(room);
    return { phase: 'PLAYING', round: room.round + 1 };
  }

  @SubscribeMessage('final:strike')
  strikeFinalTarget(
    @ConnectedSocket() socket: GameSocket,
    @MessageBody() payload: FinalStrikePayload,
  ) {
    const { room, player } = this.requireMembership(socket);
    const target = room.finalTarget;
    if (
      room.phase !== 'FINAL' ||
      !target ||
      target.id !== payload.targetId ||
      target.expiresAt < Date.now()
    ) {
      throw new WsException('Target is no longer active');
    }
    if (room.finalHitPlayers.has(player.id)) {
      throw new WsException('Target already hit');
    }

    room.finalHitPlayers.add(player.id);
    room.finalHits += 1;
    player.score += 25;
    this.namespace.to(room.code).emit('final:progress', {
      hits: room.finalHits,
      requiredHits: room.finalRequiredHits,
      playerId: player.id,
    });
    this.emitState(room);

    if (room.finalHits >= room.finalRequiredHits) {
      void this.finishGame(room, true);
    }
    return { accepted: true };
  }

  private startRound(room: RoomState) {
    const question = room.questions[room.round];
    if (!question) {
      void this.finishGame(room, false);
      return;
    }
    room.roundStartedAt = Date.now();
    room.roundResolved = false;
    room.players.forEach((player) => {
      player.answered = false;
    });
    this.namespace.to(room.code).emit('round:started', {
      round: room.round + 1,
      totalRounds: room.questions.length,
      deadline: room.roundStartedAt + 25_000,
      question: this.gameService.serializeQuestion(question, room.language),
    });
    room.timer = setTimeout(() => {
      this.resolveRound(room);
    }, 25_000);
  }

  private resolveRound(room: RoomState) {
    if (room.roundResolved || room.phase !== 'PLAYING') return;
    if (room.timer) clearTimeout(room.timer);
    room.roundResolved = true;
    const question = room.questions[room.round];
    this.namespace.to(room.code).emit('round:resolved', {
      ...this.gameService.serializeResolution(question, room.language),
      bossHp: room.bossHp,
    });
    this.emitState(room);
  }

  private startFinal(room: RoomState) {
    if (room.timer) clearTimeout(room.timer);
    room.phase = 'FINAL';
    const challenge = this.gameService.calculateFinalChallenge(
      room.bossHp,
      room.bossMaxHp,
      room.players.size,
    );
    room.finalHits = 0;
    room.finalRequiredHits = challenge.requiredHits;
    room.finalTargetLifetime = challenge.targetLifetime;
    room.finalEndsAt = Date.now() + challenge.duration;
    room.finalHitPlayers.clear();
    room.finalTarget = undefined;

    this.namespace.to(room.code).emit('final:started', {
      endsAt: room.finalEndsAt,
      hits: 0,
      requiredHits: room.finalRequiredHits,
      targetLifetime: room.finalTargetLifetime,
      bossHp: room.bossHp,
      bossMaxHp: room.bossMaxHp,
    });
    this.emitState(room);
    this.spawnFinalTarget(room);
    room.timer = setTimeout(() => {
      if (room.phase === 'FINAL') void this.finishGame(room, false);
    }, challenge.duration);
  }

  private spawnFinalTarget(room: RoomState) {
    if (room.phase !== 'FINAL' || Date.now() >= room.finalEndsAt) return;
    const target = {
      id: randomUUID(),
      x: 8 + Math.round(Math.random() * 84),
      y: 10 + Math.round(Math.random() * 76),
      expiresAt: Date.now() + room.finalTargetLifetime,
    };
    room.finalTarget = target;
    room.finalHitPlayers.clear();
    this.namespace.to(room.code).emit('final:target', target);
    room.targetTimer = setTimeout(
      () => this.spawnFinalTarget(room),
      room.finalTargetLifetime + 150,
    );
  }

  private async finishGame(room: RoomState, victory: boolean) {
    if (room.phase === 'FINISHED') return;
    if (room.timer) clearTimeout(room.timer);
    if (room.targetTimer) clearTimeout(room.targetTimer);
    room.phase = 'FINISHED';
    room.finalTarget = undefined;
    if (victory) room.bossHp = 0;
    const players = [...room.players.values()];
    const result = await this.gameService.saveResult({
      bossUuid: room.bossUuid,
      victory,
      rounds: Math.min(room.round + 1, room.questions.length),
      players,
    });
    this.namespace.to(room.code).emit('game:finished', {
      sessionUuid: result.uuid,
      victory,
      bossHp: room.bossHp,
      players: players.map((player) => ({
        id: player.id,
        nickname: player.nickname,
        score: player.score,
        correctAnswers: player.correctAnswers,
        totalAnswers: player.totalAnswers,
      })),
    });
    this.emitState(room);
  }

  private emitRound(room: RoomState, socket: GameSocket) {
    const question = room.questions[room.round];
    if (!question) return;
    socket.emit('round:started', {
      round: Math.min(room.round + 1, room.questions.length),
      totalRounds: room.questions.length,
      deadline: room.roundStartedAt + 25_000,
      question: this.gameService.serializeQuestion(question, room.language),
    });
  }

  private emitResolution(room: RoomState, socket: GameSocket) {
    const question = room.questions[room.round];
    if (!question) return;
    socket.emit('round:resolved', {
      ...this.gameService.serializeResolution(question, room.language),
      bossHp: room.bossHp,
    });
  }

  private emitFinal(room: RoomState, socket: GameSocket) {
    socket.emit('final:started', {
      endsAt: room.finalEndsAt,
      hits: room.finalHits,
      requiredHits: room.finalRequiredHits,
      targetLifetime: room.finalTargetLifetime,
      bossHp: room.bossHp,
      bossMaxHp: room.bossMaxHp,
    });
    if (room.finalTarget) socket.emit('final:target', room.finalTarget);
  }

  private emitState(room: RoomState) {
    this.namespace.to(room.code).emit('room:state', {
      code: room.code,
      hostId: room.hostId,
      bossUuid: room.bossUuid,
      phase: room.phase,
      round: room.round + 1,
      bossHp: room.bossHp,
      bossMaxHp: room.bossMaxHp,
      roundResolved: room.roundResolved,
      finalHits: room.finalHits,
      finalRequiredHits: room.finalRequiredHits,
      players: [...room.players.values()].map((player) => ({
        id: player.id,
        nickname: player.nickname,
        ready: player.ready,
        connected: player.connected,
        score: player.score,
        correctAnswers: player.correctAnswers,
        totalAnswers: player.totalAnswers,
      })),
    });
  }

  private createPlayer(socket: GameSocket, nickname: string): PlayerState {
    return {
      id: socket.data.playerId,
      socketId: socket.id,
      userUuid: socket.data.userUuid,
      nickname: nickname.trim(),
      ready: false,
      connected: true,
      score: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      answered: false,
    };
  }

  private requireMembership(socket: GameSocket) {
    const room = this.findRoomByPlayer(socket.data.playerId);
    const player = room?.players.get(socket.data.playerId);
    if (!room || !player) throw new WsException('Room membership required');
    return { room, player };
  }

  private findRoomByPlayer(playerId: string) {
    return [...this.rooms.values()].find((room) => room.players.has(playerId));
  }

  private createCode() {
    let code = '';
    do {
      code = Math.random().toString(36).slice(2, 8).toUpperCase();
    } while (this.rooms.has(code));
    return code;
  }
}
