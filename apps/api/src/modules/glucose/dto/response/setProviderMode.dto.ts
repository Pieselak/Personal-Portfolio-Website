import { ApiProperty } from '@nestjs/swagger';

export class SetProviderModeResponse {
  @ApiProperty({
    description: 'The mode that was set for the glucose provider',
    example: 'auto',
  })
  provider: string;
  @ApiProperty({
    description: 'Message indicating the result of setting the provider mode',
    example: 'Glucose provider mode has been set to auto.',
  })
  message: string;
}
