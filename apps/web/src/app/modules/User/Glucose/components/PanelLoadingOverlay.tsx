import { LoaderCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

type PanelLoadingOverlayProps = {
  visible: boolean;
};

export function PanelLoadingOverlay({ visible }: PanelLoadingOverlayProps) {
  const { t } = useTranslation();

  if (!visible) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-tile bg-surface/70 backdrop-blur-[2px]">
      <div className="flex items-center gap-2 rounded-control border border-border bg-surface px-3 py-2 text-sm font-black text-foreground">
        <LoaderCircle className="size-4 animate-spin text-primary" />
        {t("pages.user.glucose.loading")}
      </div>
    </div>
  );
}
