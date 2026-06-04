import { useTranslation } from "react-i18next";
import { UserHeader } from "@/app/layouts/User/Header/UserHeader.tsx";

export function TermsOfServicePage() {
  const { t } = useTranslation();
  const sections: string[] = [
    "general",
    "rules",
    "intellectualProperty",
    "liability",
    "complaints",
    "finalProvisions",
  ];

  return (
    <>
      <UserHeader
        title={t("pages.user.termsOfService.title")}
        subtitle={t("pages.user.termsOfService.subtitle")}
      />
      {sections.map((section) => (
        <section
          key={section}
          className="w-full rounded-xl border border-border bg-muted/30 p-3"
        >
          <h3 className={"mb-1 text-lg font-bold text-primary"}>
            {t(`pages.user.termsOfService.sections.${section}.title`)}
          </h3>
          <p className={"text-sm text-muted-foreground"}>
            {t(`pages.user.termsOfService.sections.${section}.content`)}
          </p>
        </section>
      ))}
    </>
  );
}
