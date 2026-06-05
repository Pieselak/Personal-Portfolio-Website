import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class UpdateUserRoleBody {
  @ApiProperty({ example: 'ADMIN' })
  @IsString()
  @MaxLength(50)
  roleCode: string;
}
