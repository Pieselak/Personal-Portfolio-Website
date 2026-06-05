import type { ComponentType } from "react";
import { LanguageCard } from "@/app/modules/User/SelectLanguage/components/LanguageCard.tsx";

export type LanguageOption = {
  code: string;
  name: string;
  flag: ComponentType<{ className?: string }>;
};

type LanguageListProps = {
  languages: LanguageOption[];
  currentLanguage: string;
  onSelectLanguage: (code: string) => void;
};

export function LanguageList({
  languages,
  currentLanguage,
  onSelectLanguage,
}: LanguageListProps) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {languages.map((language) => (
        <LanguageCard
          key={language.code}
          code={language.code}
          name={language.name}
          flag={language.flag}
          isActive={currentLanguage === language.code}
          onSelect={() => onSelectLanguage(language.code)}
        />
      ))}
    </section>
  );
}
