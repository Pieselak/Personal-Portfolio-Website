import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterBody {
  @ApiProperty({ example: 'admin@example.com' })
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty({ example: 'admin' })
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  username: string;

  @ApiProperty({ example: 'VeryStrongPassword123!' })
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}
