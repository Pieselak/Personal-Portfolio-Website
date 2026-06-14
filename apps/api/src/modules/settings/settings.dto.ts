import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateGameSettingsBody {
  @ApiProperty()
  @IsBoolean()
  enabled: boolean;
}

export class GameSettingsResponse {
  @ApiProperty({
    description: 'Indicates whether new educational game sessions are enabled',
    example: true,
  })
  enabled: boolean;
}
