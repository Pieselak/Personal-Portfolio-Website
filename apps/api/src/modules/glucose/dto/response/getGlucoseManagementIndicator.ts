import { ApiProperty } from '@nestjs/swagger';

export class GetGlucoseManagementIndicatorResponse {
  @ApiProperty({
    type: Boolean,
    description:
      'Indicates whether sufficient data is available for calculation',
    example: true,
  })
  isDataSufficient: boolean;

  @ApiProperty({
    type: Number,
    description:
      'Value of the Glucose Management Indicator calculated based on the glucose readings in the specified period',
    example: 55,
  })
  value: number;

  @ApiProperty({
    type: Number,
    description: 'Number of hours included in the calculation period',
    example: 168,
    required: false,
  })
  hours?: number;
}
