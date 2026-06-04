import { ShieldBanIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { StatePanel } from "@/app/components/ui.tsx";

export function ForbiddenPage() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-2xl self-center">
      <ShieldBanIcon className="mx-auto mb-4 size-10 text-accent" />
      <StatePanel
        title={t("pages.forbidden.title")}
        message={t("pages.forbidden.message")}
      />
    </div>
  );
}
