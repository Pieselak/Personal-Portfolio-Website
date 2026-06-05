import { useLocation, useNavigate } from "react-router-dom";
import i18n, { getAvailableLanguages } from "@/i18n.ts";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/app/components/motion/Reveal.tsx";
import { PageShell } from "@/app/components/ui/PageShell.tsx";
import { UserHeader } from "@/app/layouts/User/Header/UserHeader.tsx";
import { LanguageEmptyState } from "@/app/modules/User/SelectLanguage/components/LanguageEmptyState.tsx";
import { LanguageList } from "@/app/modules/User/SelectLanguage/components/LanguageList.tsx";

export function SelectLanguagePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const langRedirect: string | null = location.state?.langRedirect;
  const languages = getAvailableLanguages();
  const currentLanguage = i18n.language;

  function handleSelectLanguage(code: string) {
    i18n.changeLanguage(code);

    if (langRedirect) {
      navigate(langRedirect);
    }
  }

  return (
    <PageShell>
      <UserHeader
        title={t("pages.selectLanguage.title")}
        subtitle={t("pages.selectLanguage.subtitle")}
      />

      <Reveal>
        {languages.length > 0 ? (
          <LanguageList
            languages={languages}
            currentLanguage={currentLanguage}
            onSelectLanguage={handleSelectLanguage}
          />
        ) : (
          <LanguageEmptyState message={t("pages.selectLanguage.noLanguages")} />
        )}
      </Reveal>
    </PageShell>
  );
}
