import { ConstructionIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { StatePanel } from "@/app/components/ui.tsx";

export function MaintenancePage() {
  const { t } = useTranslation();
  return (
    <div className="w-full max-w-2xl self-center">
      <ConstructionIcon className="mx-auto mb-4 size-10 text-accent" />
      <StatePanel
        title={t("pages.maintenance.title")}
        message={t("pages.maintenance.message")}
      />
    </div>
  );
}
