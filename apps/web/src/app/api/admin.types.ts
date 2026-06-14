import type {
  RoleResponse,
  TranslatedTextDto,
} from "@/app/api/generated-api.ts";

export type TranslatedText = TranslatedTextDto;

export type AdminProject = {
  uuid: string;
  status: { code: string; label: string };
  translations: {
    title: TranslatedText;
    shortDescription: TranslatedText;
    detailedDescription: TranslatedText;
  };
  title: string;
  shortDescription: string;
  detailedDescription: string;
  imageUrl?: string;
  tags: string[];
  sourceCodeOpen: boolean;
  sourceCodeUrl?: string;
  developers: Array<{ name: string; role?: string; profileUrl?: string }>;
  startDate?: string;
  completeDate?: string;
  isPublished: boolean;
};

export type Announcement = {
  uuid: string;
  title: TranslatedText;
  content: TranslatedText;
  actionLabel: TranslatedText | null;
  actionUrl: string | null;
  variant: "INFO" | "SUCCESS" | "WARNING" | "CRITICAL";
  dismissible: boolean;
  published: boolean;
};

export type GameBoss = {
  uuid: string;
  slug: string;
  name: TranslatedText;
  description: TranslatedText;
  published: boolean;
  maxRounds: number;
  questionCount?: number;
};

export type GameAnswer = {
  uuid?: string;
  content: TranslatedText;
  isCorrect: boolean;
  orderIndex?: number | null;
  matchKey?: string | null;
};

export type GameQuestion = {
  uuid: string;
  boss: GameBoss;
  content: TranslatedText;
  explanation: TranslatedText;
  type: "SINGLE_CHOICE" | "TRUE_FALSE" | "ORDER" | "MATCHING";
  category: string;
  difficulty: number;
  sourceUrl: string;
  verifiedAt: string;
  published: boolean;
  version: number;
  answers: GameAnswer[];
};

export type Role = RoleResponse;
