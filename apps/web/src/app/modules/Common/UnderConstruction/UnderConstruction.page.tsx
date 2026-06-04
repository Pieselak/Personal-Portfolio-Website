import { HardHatIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { StatePanel } from "@/app/components/ui.tsx";

export function UnderConstructionPage() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-2xl self-center">
      <HardHatIcon className="mx-auto mb-4 size-10 text-accent" />
      <StatePanel
        title={t("pages.underConstruction.title")}
        message={t("pages.underConstruction.message")}
      />
    </div>
  );
}
