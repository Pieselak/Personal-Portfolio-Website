import { ApiProperty } from '@nestjs/swagger';

export class MaintenanceModeResponse {
  @ApiProperty({
    description: 'Indicates if the maintenance mode is enabled',
    example: true,
  })
  enabled: boolean;

  @ApiProperty({
    description: 'Message indicating the maintenance mode status',
    example: 'Maintenance mode has been enabled.',
  })
  message: string;
}
