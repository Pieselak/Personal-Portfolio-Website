import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { TranslatedTextDto } from '../../../../common/dto/translated-text.dto';

export enum ProjectStatusCode {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
}

export class ProjectDeveloperBody {
  @ApiProperty({ example: 'Patryk Z.' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({ example: 'Full-Stack Developer' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  role?: string;

  @ApiPropertyOptional({ example: 'https://github.com/Pieselak' })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  profileUrl?: string;
}

export class CreateProjectBody {
  @ApiProperty({ enum: ProjectStatusCode, example: ProjectStatusCode.PLANNED })
  @IsEnum(ProjectStatusCode)
  status: ProjectStatusCode;

  @ApiProperty({ type: TranslatedTextDto })
  @ValidateNested()
  @Type(() => TranslatedTextDto)
  title: TranslatedTextDto;

  @ApiProperty({ type: TranslatedTextDto })
  @ValidateNested()
  @Type(() => TranslatedTextDto)
  shortDescription: TranslatedTextDto;

  @ApiProperty({ type: TranslatedTextDto })
  @ValidateNested()
  @Type(() => TranslatedTextDto)
  detailedDescription: TranslatedTextDto;

  @ApiPropertyOptional({ example: 'https://example.com/project-preview.png' })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  imageUrl?: string;

  @ApiPropertyOptional({
    type: String,
    isArray: true,
    example: ['TypeScript', 'React', 'NestJS'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ example: true })
  @IsBoolean()
  sourceCodeOpen: boolean;

  @ApiPropertyOptional({
    example: 'https://github.com/Pieselak/Vite_React_ExpressJS_AboutMe',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(500)
  sourceCodeUrl?: string;

  @ApiPropertyOptional({ type: ProjectDeveloperBody, isArray: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectDeveloperBody)
  developers?: ProjectDeveloperBody[];

  @ApiPropertyOptional({ example: '2025-11-19' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ example: '2026-01-31' })
  @IsOptional()
  @IsDateString()
  completeDate?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
