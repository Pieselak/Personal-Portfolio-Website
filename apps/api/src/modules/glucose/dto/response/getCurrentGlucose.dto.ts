import { ApiProperty } from '@nestjs/swagger';
import {
  GlucoseColors,
  GlucoseStatus,
  GlucoseTrends,
  GlucoseUnits,
} from '../../glucose.enum';

export class GetCurrentGlucoseResponse {
  @ApiProperty({
    type: Boolean,
    description:
      'Indicates whether the glucose measurement is current and up-to-date',
    example: true,
  })
  isCurrent: boolean;

  @ApiProperty({
    type: Number,
    description: 'Current glucose measurement value',
    example: 118,
  })
  value: number;

  @ApiProperty({
    type: String,
    enum: GlucoseUnits,
    enumName: 'GlucoseUnit',
    description: 'Unit of measurement for glucose value',
    example: GlucoseUnits.MG_DL,
  })
  unit: string;

  @ApiProperty({
    type: String,
    enum: GlucoseColors,
    enumName: 'GlucoseColor',
    description: 'Color indicator representing the glucose level range',
    example: GlucoseColors.GREEN,
  })
  color: string;

  @ApiProperty({
    type: String,
    enum: GlucoseTrends,
    enumName: 'GlucoseTrend',
    description: 'Direction of glucose level change trend',
    example: GlucoseTrends.STABLE,
  })
  trend: string;

  @ApiProperty({
    type: String,
    enum: GlucoseStatus,
    enumName: 'GlucoseStatus',
    description: 'Current status of glucose measurement',
    example: GlucoseStatus.COMPUTABLE,
  })
  status: string;

  @ApiProperty({
    type: String,
    description:
      'Unix timestamp in milliseconds when the glucose reading was taken',
    example: 1672531199000,
  })
  timestamp: number;

  @ApiProperty({
    type: Number,
    description:
      'Unix timestamp in milliseconds when the next data update will occur',
    example: 1672534799000,
  })
  refreshAt: number;

  @ApiProperty({
    type: Number,
    description: 'Time in milliseconds until the next data update is expected',
    example: 60000,
  })
  refreshIn: number;
}
