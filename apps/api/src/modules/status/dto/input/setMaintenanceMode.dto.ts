import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export class MaintenanceModeInput {
  @ApiProperty({
    description:
      'Indicates if the maintenance mode should be enabled or disabled',
    example: true,
  })
  @Type(() => Boolean)
  @IsBoolean()
  enable: boolean;
}
