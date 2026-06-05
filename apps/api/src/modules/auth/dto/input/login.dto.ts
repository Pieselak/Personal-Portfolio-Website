import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginBody {
  @ApiProperty({ example: 'admin@example.com' })
  @IsString()
  identifier: string;

  @ApiProperty({ example: 'VeryStrongPassword123!' })
  @IsString()
  @MinLength(8)
  password: string;
}
