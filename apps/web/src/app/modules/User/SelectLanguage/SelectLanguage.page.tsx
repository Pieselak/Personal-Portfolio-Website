import { useLocation, useNavigate } from "react-router-dom";
import i18n, { getAvailableLanguages } from "@/i18n.ts";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export function SelectLanguagePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const langRedirect: string | null = location.state?.langRedirect;
  const languages = getAvailableLanguages();
  const currentLanguage = i18n.language;

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col justify-start items-center min-w-full">
      <div className="space-y-6 w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            {t("pages.selectLanguage.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("pages.selectLanguage.subtitle")}
          </p>
        </div>

        {languages.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
            className="flex flex-wrap justify-center items-center gap-2.5"
          >
            {languages.map((language, index) => (
              <motion.button
                key={language.code}
                custom={index}
                variants={itemVariants}
                className={`grow min-w-26`}
                onClick={() => {
                  i18n.changeLanguage(language.code);
                  if (langRedirect) {
                    navigate(langRedirect);
                  }
                }}
              >
                <div
                  className={`flex-1 flex flex-col items-center gap-2 w-full px-4 py-3 rounded-xl border transition-all duration-250 font-medium cursor-pointer ${
                    currentLanguage === language.code
                      ? "bg-accent/20 border-ring text-primary shadow-sm"
                      : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <language.flag className="size-10 rounded-full bg-secondary p-0.5" />
                  <span>
                    ({language.code.toUpperCase()}) {language.name}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <p className="bg-card border-2 border-dashed border-border rounded-2xl p-12 text-center text-muted-foreground">
            {t("pages.selectLanguage.noLanguages")}
          </p>
        )}
      </div>
    </div>
  );
}
