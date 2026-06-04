import { useLocation, useNavigate } from "react-router-dom";
import i18n, { getAvailableLanguages } from "@/i18n.ts";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Card, SectionHeader, StatePanel } from "@/app/components/ui.tsx";
import { cn } from "@/app/components/cn.ts";

export function SelectLanguagePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const langRedirect: string | null = location.state?.langRedirect;
  const languages = getAvailableLanguages();
  const currentLanguage = i18n.language;

  return (
    <motion.div
      className="w-full space-y-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <SectionHeader
        eyebrow={t("pages.selectLanguage.eyebrow")}
        title={t("pages.selectLanguage.title")}
        description={t("pages.selectLanguage.subtitle")}
      />

      {languages.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {languages.map((language) => (
            <button
              key={language.code}
              className="text-left"
              onClick={() => {
                i18n.changeLanguage(language.code);
                if (langRedirect) {
                  navigate(langRedirect);
                }
              }}
            >
              <Card
                className={cn(
                  "flex min-h-28 items-center gap-4 p-5 transition-[border-color,background-color]",
                  currentLanguage === language.code
                    ? "border-ring bg-secondary"
                    : "hover:border-ring",
                )}
              >
                <language.flag className="size-11 shrink-0 rounded-full border border-border bg-card p-0.5" />
                <div>
                  <p className="text-2xl font-semibold text-foreground">
                    {language.name}
                  </p>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    {language.code}
                  </p>
                </div>
              </Card>
            </button>
          ))}
        </div>
      ) : (
        <StatePanel message={t("pages.selectLanguage.noLanguages")} />
      )}
    </motion.div>
  );
}
