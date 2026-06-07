import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GlucoseProviders } from '../../glucose.enum';

export enum GlucoseAvailabilityReason {
  MODULE_DISABLED = 'MODULE_DISABLED',
  NO_PROVIDER = 'NO_PROVIDER',
  INITIALIZING = 'INITIALIZING',
  AVAILABLE = 'AVAILABLE',
}

export type GlucoseProviderMode = 'none' | 'auto' | GlucoseProviders;

export class GetGlucoseAvailabilityResponse {
  @ApiProperty({
    description: 'Indicates whether the glucose module is enabled',
    example: true,
  })
  enabled: boolean;

  @ApiProperty({
    description: 'Indicates whether an active glucose provider is selected',
    example: true,
  })
  hasProvider: boolean;

  @ApiProperty({
    description: 'Configured glucose provider mode',
    enum: ['none', 'auto', GlucoseProviders.LIBRE, GlucoseProviders.DEXCOM],
    example: 'auto',
  })
  configuredProvider: GlucoseProviderMode;

  @ApiPropertyOptional({
    description: 'Currently active glucose provider',
    enum: GlucoseProviders,
    example: GlucoseProviders.LIBRE,
  })
  activeProvider?: GlucoseProviders;

  @ApiProperty({
    description: 'Machine-readable reason for the current availability state',
    enum: GlucoseAvailabilityReason,
    example: GlucoseAvailabilityReason.AVAILABLE,
  })
  reason: GlucoseAvailabilityReason;
}
