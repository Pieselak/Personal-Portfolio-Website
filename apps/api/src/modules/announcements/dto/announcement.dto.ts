import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { TranslatedTextDto } from '../../../common/dto/translated-text.dto';
import { AnnouncementVariant } from '../entities/announcement.entity';

export class CreateAnnouncementBody {
  @ApiProperty({ type: TranslatedTextDto })
  @ValidateNested()
  @Type(() => TranslatedTextDto)
  title: TranslatedTextDto;

  @ApiProperty({ type: TranslatedTextDto })
  @ValidateNested()
  @Type(() => TranslatedTextDto)
  content: TranslatedTextDto;

  @ApiPropertyOptional({ type: TranslatedTextDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => TranslatedTextDto)
  actionLabel?: TranslatedTextDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  actionUrl?: string;

  @ApiProperty({ enum: AnnouncementVariant })
  @IsEnum(AnnouncementVariant)
  variant: AnnouncementVariant;

  @ApiProperty()
  @IsBoolean()
  dismissible: boolean;
}

export class UpdateAnnouncementBody extends PartialType(
  CreateAnnouncementBody,
) {}

export class AnnouncementResponse {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiPropertyOptional()
  actionLabel?: string;

  @ApiPropertyOptional()
  actionUrl?: string;

  @ApiProperty({ enum: AnnouncementVariant })
  variant: AnnouncementVariant;

  @ApiProperty()
  dismissible: boolean;
}
