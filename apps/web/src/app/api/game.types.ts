export type GamePlayer = {
  id: string;
  nickname: string;
  ready: boolean;
  connected: boolean;
  score: number;
  correctAnswers: number;
  totalAnswers: number;
};

export type RoomState = {
  code: string;
  hostId: string;
  bossUuid: string;
  phase: "LOBBY" | "PLAYING" | "FINAL" | "FINISHED";
  round: number;
  bossHp: number;
  bossMaxHp: number;
  roundResolved: boolean;
  finalHits: number;
  finalRequiredHits: number;
  players: GamePlayer[];
};

export type GameQuestion = {
  uuid: string;
  type: "SINGLE_CHOICE" | "TRUE_FALSE" | "ORDER" | "MATCHING";
  category: string;
  content: string;
  answers: Array<{ uuid: string; content: string; matchKey?: string }>;
};

export type RoundState = {
  round: number;
  totalRounds: number;
  deadline: number;
  question: GameQuestion;
};

export type GameResult = {
  sessionUuid: string;
  victory: boolean;
  bossHp: number;
  players: GamePlayer[];
};

export type GameResolution = {
  correctAnswerIds: string[];
  explanation: string;
  sourceUrl: string;
  bossHp: number;
};

export type FinalChallenge = {
  endsAt: number;
  hits: number;
  requiredHits: number;
  targetLifetime: number;
  bossHp: number;
  bossMaxHp: number;
};

export type FinalTarget = {
  id: string;
  x: number;
  y: number;
  expiresAt: number;
};
