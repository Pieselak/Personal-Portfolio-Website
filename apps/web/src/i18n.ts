import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { BadgeQuestionMarkIcon } from "lucide-react";
import en from "./locales/en.ts";
import pl from "./locales/pl.ts";
import de from "./locales/de.ts";

const resources = { en, pl, de } as const satisfies Record<string, any>;
let languages: languageItem[] = [];

type ResourceKey = keyof typeof resources;
type languageItem = {
  code: string;
  name: string;
  flag: any;
};

i18next.use(initReactI18next).init(
  {
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false,
    },
  },
  () => {
    for (const lang of Object.keys(resources) as ResourceKey[]) {
      languages.push({
        code: lang as string,
        name: resources[lang].data.name ?? "unknown",
        flag: resources[lang].data.flag ?? BadgeQuestionMarkIcon,
      });
    }
  },
);

i18next.on("languageChanged", (lng: string) => {
  document.documentElement.lang = lng;
  localStorage.setItem("language", lng);
});

export default i18next;
export const getAvailableLanguages = (): languageItem[] => languages;
export const getFirstLanguageCode = () =>
  languages.length > 0 ? languages[0].code : "unknown";
export const getSavedLanguageCode = () => {
  const savedLanguage = localStorage.getItem("language");
  if (savedLanguage && resources.hasOwnProperty(savedLanguage)) {
    return savedLanguage;
  }
  return null;
};
