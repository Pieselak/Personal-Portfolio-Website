import { ApiProperty } from '@nestjs/swagger';
import { GlucoseSensors } from '../../glucose.enum';

export class GetSensorDataResponse {
  @ApiProperty({
    type: Boolean,
    description: 'Indicates whether the sensor is currently active',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    type: String,
    description: 'Name of the glucose sensor device',
    enum: GlucoseSensors,
    enumName: 'GlucoseSensor',
    example: GlucoseSensors.LIBRE,
    nullable: true,
  })
  name: string | null;

  @ApiProperty({
    type: String,
    description: 'Image URL of the glucose sensor device',
    example: 'https://example.com/images/libre2.png',
    nullable: true,
  })
  image: string | null;

  @ApiProperty({
    type: Number,
    description: 'Unix timestamp in milliseconds when the sensor was activated',
    example: 1672531199000,
    nullable: true,
  })
  activatedAt: number | null;

  @ApiProperty({
    type: Number,
    description:
      'Unix timestamp in milliseconds when the sensor data was last uploaded',
    example: 1672531199000,
    nullable: true,
  })
  lastUploadAt: number | null;

  @ApiProperty({
    type: Number,
    description: 'Unix timestamp in milliseconds when the sensor will expire',
    example: 1672531199000,
    nullable: true,
  })
  expireAt: number | null;

  @ApiProperty({
    type: Number,
    description: 'Time in milliseconds when the sensor will expire',
    example: 172800000,
    nullable: true,
  })
  expireIn: number | null;
}
