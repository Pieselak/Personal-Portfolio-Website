import { ApiProperty } from '@nestjs/swagger';

export class GetProviderModesResponse {
  @ApiProperty({
    description:
      'List of available modes for the glucose provider with their selection status',
    example: [
      { name: 'none', selected: true },
      { name: 'auto', selected: false },
    ],
  })
  providers: Array<{ name: string; selected: boolean }>;
}
