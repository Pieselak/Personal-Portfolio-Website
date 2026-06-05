import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class GetGlucoseManagementIndicatorQuery {
  @ApiProperty({
    description: 'Number of hours to calculate glucose reading, minimum 7 days',
    minimum: 168,
    required: false,
    example: 672,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(8760)
  hours?: number;
}
