import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  Equals,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { TranslatedTextDto } from '../../../common/dto/translated-text.dto';
import { GameQuestionType } from '../entities/game-question.entity';

export class CreateBossBody {
  @ApiProperty()
  @IsString()
  @Matches(/^[a-z0-9-]+$/)
  @MaxLength(80)
  slug: string;

  @ApiProperty({ type: TranslatedTextDto })
  @ValidateNested()
  @Type(() => TranslatedTextDto)
  name: TranslatedTextDto;

  @ApiProperty({ type: TranslatedTextDto })
  @ValidateNested()
  @Type(() => TranslatedTextDto)
  description: TranslatedTextDto;

  @ApiProperty({ minimum: 5, maximum: 30 })
  @IsInt()
  @Min(5)
  @Max(30)
  maxRounds: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  published?: boolean;
}

export class UpdateBossBody extends PartialType(CreateBossBody) {}

export class GameAnswerBody {
  @ApiProperty({ type: TranslatedTextDto })
  @ValidateNested()
  @Type(() => TranslatedTextDto)
  content: TranslatedTextDto;

  @ApiProperty()
  @IsBoolean()
  isCorrect: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  orderIndex?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(80)
  matchKey?: string;
}

export class CreateQuestionBody {
  @ApiProperty()
  @IsString()
  bossUuid: string;

  @ApiProperty({ type: TranslatedTextDto })
  @ValidateNested()
  @Type(() => TranslatedTextDto)
  content: TranslatedTextDto;

  @ApiProperty({ type: TranslatedTextDto })
  @ValidateNested()
  @Type(() => TranslatedTextDto)
  explanation: TranslatedTextDto;

  @ApiProperty({ enum: GameQuestionType })
  @IsEnum(GameQuestionType)
  type: GameQuestionType;

  @ApiProperty()
  @IsString()
  @MaxLength(80)
  category: string;

  @ApiProperty({ minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  difficulty: number;

  @ApiProperty()
  @IsUrl()
  @MaxLength(500)
  sourceUrl: string;

  @ApiProperty()
  @IsDateString()
  verifiedAt: string;

  @ApiProperty({ type: [GameAnswerBody] })
  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => GameAnswerBody)
  answers: GameAnswerBody[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  published?: boolean;
}

export class PublicBossResponse {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  maxRounds: number;

  @ApiProperty()
  questionCount: number;
}

export class GameAdminStatsResponse {
  @ApiProperty({
    description: 'Number of players currently connected to active game rooms',
    example: 4,
    minimum: 0,
  })
  activePlayers: number;
}

export class ImportQuestionBody extends OmitType(CreateQuestionBody, [
  'bossUuid',
] as const) {}

export class ImportBossBody extends CreateBossBody {
  @ApiProperty({ type: [ImportQuestionBody] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(500)
  @ValidateNested({ each: true })
  @Type(() => ImportQuestionBody)
  questions: ImportQuestionBody[];
}

export class ImportGameContentBody {
  @ApiProperty({ enum: [1], example: 1 })
  @Equals(1)
  version: number;

  @ApiProperty({ type: [ImportBossBody] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => ImportBossBody)
  bosses: ImportBossBody[];
}

export class ImportedBossResponse {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  slug: string;
}

export class ImportGameContentResponse {
  @ApiProperty()
  bossesImported: number;

  @ApiProperty()
  questionsImported: number;

  @ApiProperty({ type: [ImportedBossResponse] })
  bosses: ImportedBossResponse[];
}

export class UpdateQuestionBody extends PartialType(CreateQuestionBody) {}

export class CreateRoomPayload {
  @IsString()
  @MinLength(2)
  @MaxLength(40)
  nickname: string;

  @IsString()
  bossUuid: string;

  @IsOptional()
  @IsString()
  language?: string;
}

export class JoinRoomPayload {
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  code: string;

  @IsString()
  @MinLength(2)
  @MaxLength(40)
  nickname: string;
}

export class SubmitAnswerPayload {
  @IsArray()
  @IsString({ each: true })
  answerIds: string[];

  @ApiPropertyOptional()
  @IsOptional()
  matches?: Record<string, string>;
}

export class FinalStrikePayload {
  @IsString()
  targetId: string;
}
