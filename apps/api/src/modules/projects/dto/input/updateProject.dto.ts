import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { IsDateString, IsOptional, ValidateIf } from 'class-validator';
import { CreateProjectBody } from './createProject.dto';

export class UpdateProjectBody extends PartialType(
  OmitType(CreateProjectBody, ['startDate', 'completeDate'] as const),
) {
  @ApiPropertyOptional({ type: String, example: '2025-11-19', nullable: true })
  @IsOptional()
  @ValidateIf((_, value: unknown) => value !== null)
  @IsDateString()
  startDate?: string | null;

  @ApiPropertyOptional({ type: String, example: '2026-01-31', nullable: true })
  @IsOptional()
  @ValidateIf((_, value: unknown) => value !== null)
  @IsDateString()
  completeDate?: string | null;
}
