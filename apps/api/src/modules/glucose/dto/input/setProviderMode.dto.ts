import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class SetProviderModeBody {
  @ApiProperty({
    description: 'The mode to set for the glucose provider',
    example: 'auto',
  })
  @Type(() => String)
  @IsString()
  provider: string;
}
