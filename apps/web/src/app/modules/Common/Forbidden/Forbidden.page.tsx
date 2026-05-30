import { ShieldBanIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ForbiddenPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center self-center gap-2.5 sm:flex-row">
      <ShieldBanIcon className="text-primary size-16 max-sm:size-25" />
      <div className="border border-border max-sm:w-full sm:h-16"></div>
      <div>
        <h1 className="text-2xl font-bold text-primary max-sm:text-center">
          {t("pages.forbidden.title")}
        </h1>
        <h2 className="text-foreground max-sm:text-center">
          {t("pages.forbidden.message")}
        </h2>
      </div>
    </div>
  );
}
