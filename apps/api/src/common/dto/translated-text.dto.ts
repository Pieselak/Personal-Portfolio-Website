import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export type SupportedLanguage = 'pl' | 'en' | 'de';
export type TranslatedText = Record<SupportedLanguage, string>;

export class TranslatedTextDto implements TranslatedText {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  pl: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  en: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  de: string;
}

export function translate(
  value: Partial<TranslatedText> | null | undefined,
  language: string,
): string {
  const normalized: SupportedLanguage =
    language === 'en' || language === 'de' ? language : 'pl';
  return value?.[normalized] || value?.pl || value?.en || value?.de || '';
}
