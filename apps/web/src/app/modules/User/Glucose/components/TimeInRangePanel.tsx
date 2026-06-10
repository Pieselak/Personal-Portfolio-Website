import { useTranslation } from "react-i18next";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";
import { useGlucoseTimeInRange } from "@/app/api/queries/useGlucose.ts";
import {
  GlucoseErrorState,
  GlucoseLoadingState,
  GlucoseMessageState,
} from "@/app/modules/User/Glucose/GlucoseStates.tsx";
import { TimeInRangeStack } from "@/app/modules/User/Glucose/components/TimeInRangeStack.tsx";
import {
  getGlucoseRangeHours,
  type GlucoseTimeRange,
} from "@/app/modules/User/Glucose/constants/glucoseTimeRanges.ts";
import { getTimeInRangeSegments } from "@/app/modules/User/Glucose/utils/glucoseDisplay.ts";
import { PanelLoadingOverlay } from "@/app/modules/User/Glucose/components/PanelLoadingOverlay.tsx";
import { formatGlucoseDuration } from "@/app/modules/User/Glucose/utils/glucoseFormatters.ts";

type TimeInRangePanelProps = {
  selectedRange: GlucoseTimeRange;
};

export function TimeInRangePanel({ selectedRange }: TimeInRangePanelProps) {
  const { t, i18n } = useTranslation();
  const hours = getGlucoseRangeHours(selectedRange);
  const timeInRangeQuery = useGlucoseTimeInRange(hours);

  if (timeInRangeQuery.isLoading) return <GlucoseLoadingState />;

  if (timeInRangeQuery.isError || !timeInRangeQuery.data) {
    return (
      <GlucoseErrorState message={t("pages.user.glucose.errors.timeInRange")} />
    );
  }

  const timeInRange = timeInRangeQuery.data;
  const segments = getTimeInRangeSegments(timeInRange);

  return (
    <BentoTile
      title={t("pages.user.glucose.subpages.timeInRange.title")}
      description={
        timeInRange.hours || hours
          ? t("pages.user.glucose.timeInRange.period", {
              duration: formatGlucoseDuration(
                (timeInRange.hours || hours || 0) * 60 * 60 * 1000,
                i18n.language,
              ),
            })
          : t("pages.user.glucose.timeInRange.periodAll")
      }
      className="relative"
    >
      <PanelLoadingOverlay visible={timeInRangeQuery.isFetching} />
      {!timeInRange.isDataSufficient ? (
        <GlucoseMessageState
          message={t("pages.user.glucose.errors.insufficientData")}
        />
      ) : (
        <TimeInRangeStack segments={segments} />
      )}
    </BentoTile>
  );
}
