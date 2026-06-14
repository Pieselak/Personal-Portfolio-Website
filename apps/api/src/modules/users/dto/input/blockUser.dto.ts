import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, MaxLength, MinLength } from 'class-validator';

export class BlockUserBody {
  @ApiProperty({
    example: '2026-06-21T12:00:00.000Z',
    description: 'ISO timestamp until which the account remains blocked',
  })
  @IsDateString()
  blockedUntil: string;

  @ApiProperty({
    example: 'Repeated violation of the service rules',
    maxLength: 500,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  reason: string;
}
