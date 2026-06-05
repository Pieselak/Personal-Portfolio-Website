import { Activity } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";
import { Notice } from "@/app/components/ui/Notice.tsx";
import type { GetGlucoseManagementIndicatorResponse } from "@/app/api/generated-api.ts";
import { isRangeShorterThanSevenDays, type GlucoseTimeRange } from "@/app/modules/User/Glucose/constants/glucoseTimeRanges.ts";

type GmiTileProps = {
  gmi: GetGlucoseManagementIndicatorResponse;
  selectedRange: GlucoseTimeRange;
};

export function GmiTile({ gmi, selectedRange }: GmiTileProps) {
  const { t } = useTranslation();
  const isTooShort = isRangeShorterThanSevenDays(selectedRange);
  const noticeMessage = isTooShort
    ? t("pages.user.glucose.summary.gmi.insufficient")
    : t("pages.user.glucose.summary.gmi.insufficientDatabase");

  return (
    <BentoTile
      className="bg-surface-raised"
      eyebrow={t("pages.user.glucose.summary.gmi.eyebrow")}
      title={t("pages.user.glucose.summary.gmi.title")}
      action={<Activity className="size-5 text-primary" />}
    >
      {!gmi.isDataSufficient || isTooShort ? (
        <Notice tone="yellow">{noticeMessage}</Notice>
      ) : (
        <div>
          <p className="text-5xl font-black leading-none text-primary">
            {gmi.value}%
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            {t("pages.user.glucose.summary.gmi.context")}
          </p>
        </div>
      )}
    </BentoTile>
  );
}
