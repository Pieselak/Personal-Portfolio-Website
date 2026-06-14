import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateRoleBody {
  @ApiProperty({ example: 'EDITOR' })
  @IsString()
  @Matches(/^[A-Za-z][A-Za-z0-9_]*$/)
  @MaxLength(50)
  code: string;

  @ApiProperty({ example: 'Editor' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  label: string;

  @ApiProperty({ type: String, isArray: true })
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  permissions: string[];
}

export class UpdateRoleBody {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  label?: string;

  @ApiPropertyOptional({ type: String, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsString({ each: true })
  permissions?: string[];
}

export class DeleteRoleBody {
  @ApiProperty({ example: 'USER' })
  @IsString()
  replacementRoleCode: string;
}

export class RoleResponse {
  @ApiProperty({ example: 'EDITOR' })
  code: string;

  @ApiProperty({ example: 'Editor' })
  label: string;

  @ApiProperty()
  isSystem: boolean;

  @ApiProperty({ type: String, isArray: true })
  permissions: string[];
}
