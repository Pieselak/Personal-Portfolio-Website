import { ApiProperty } from '@nestjs/swagger';

export class GlucoseProviderModeResponse {
  @ApiProperty({ example: 'auto' })
  name: string;

  @ApiProperty({ example: true })
  selected: boolean;
}

export class GetProviderModesResponse {
  @ApiProperty({
    description:
      'List of available modes for the glucose provider with their selection status',
    type: [GlucoseProviderModeResponse],
    example: [
      { name: 'none', selected: true },
      { name: 'auto', selected: false },
    ],
  })
  providers: GlucoseProviderModeResponse[];
}
