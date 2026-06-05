import { useTranslation } from "react-i18next";
import { Reveal } from "@/app/components/motion/Reveal.tsx";
import { PageShell } from "@/app/components/ui/PageShell.tsx";
import { UserHeader } from "@/app/layouts/User/Header/UserHeader.tsx";
import { LegalDocumentSectionPanel } from "@/app/modules/User/LegalDocuments/components/LegalDocumentSectionPanel.tsx";
import { PRIVACY_POLICY_SECTIONS } from "@/app/modules/User/PrivacyPolicy/constants/privacyPolicySections.ts";

export function PrivacyPolicyPage() {
  const { t } = useTranslation();

  return (
    <PageShell>
      <UserHeader
        title={t("pages.user.privacyPolicy.title")}
        subtitle={t("pages.user.privacyPolicy.subtitle")}
      />

      <div className="grid gap-4">
        {PRIVACY_POLICY_SECTIONS.map((section) => (
          <Reveal key={section}>
            <LegalDocumentSectionPanel
              title={t(`pages.user.privacyPolicy.sections.${section}.title`)}
              content={t(
                `pages.user.privacyPolicy.sections.${section}.content`,
              )}
            />
          </Reveal>
        ))}
      </div>
    </PageShell>
  );
}
