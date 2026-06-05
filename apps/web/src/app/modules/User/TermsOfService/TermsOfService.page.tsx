import { useTranslation } from "react-i18next";
import { Reveal } from "@/app/components/motion/Reveal.tsx";
import { PageShell } from "@/app/components/ui/PageShell.tsx";
import { UserHeader } from "@/app/layouts/User/Header/UserHeader.tsx";
import { LegalDocumentSectionPanel } from "@/app/modules/User/LegalDocuments/components/LegalDocumentSectionPanel.tsx";
import { TERMS_OF_SERVICE_SECTIONS } from "@/app/modules/User/TermsOfService/constants/termsOfServiceSections.ts";

export function TermsOfServicePage() {
  const { t } = useTranslation();

  return (
    <PageShell>
      <UserHeader
        title={t("pages.user.termsOfService.title")}
        subtitle={t("pages.user.termsOfService.subtitle")}
      />

      <div className="grid gap-4">
        {TERMS_OF_SERVICE_SECTIONS.map((section) => (
          <Reveal key={section}>
            <LegalDocumentSectionPanel
              title={t(`pages.user.termsOfService.sections.${section}.title`)}
              content={t(
                `pages.user.termsOfService.sections.${section}.content`,
              )}
            />
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
