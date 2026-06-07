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

  @ApiProperty({ example: 'Portfolio Website with Glucose Sensor Integration' })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({ example: 'Modern portfolio website with CGM integration.' })
  @IsString()
  shortDescription: string;

  @ApiProperty({
    example:
      'The project presents a portfolio, projects module, and glucose sensor integration.',
  })
  @IsString()
  detailedDescription: string;

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
}
