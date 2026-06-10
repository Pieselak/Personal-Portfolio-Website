import { useTranslation } from "react-i18next";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";
import {
  useGlucoseAverage,
  useGlucoseHighest,
  useGlucoseLowest,
  useGlucoseManagementIndicator,
  useGlucoseTimeInRange,
} from "@/app/api/queries/useGlucose.ts";
import {
  GlucoseErrorState,
  GlucoseLoadingState,
} from "@/app/modules/User/Glucose/GlucoseStates.tsx";
import { GlucoseMetricGrid } from "@/app/modules/User/Glucose/components/GlucoseMetricGrid.tsx";
import { GmiTile } from "@/app/modules/User/Glucose/components/GmiTile.tsx";
import {
  getGlucoseRangeHours,
  type GlucoseTimeRange,
} from "@/app/modules/User/Glucose/constants/glucoseTimeRanges.ts";
import { PanelLoadingOverlay } from "@/app/modules/User/Glucose/components/PanelLoadingOverlay.tsx";
import { formatGlucoseDuration } from "@/app/modules/User/Glucose/utils/glucoseFormatters.ts";
import i18n from "@/i18n.ts";

type SummaryPanelProps = {
  selectedRange: GlucoseTimeRange;
};

export function SummaryPanel({ selectedRange }: SummaryPanelProps) {
  const { t } = useTranslation();
  const hours = getGlucoseRangeHours(selectedRange);
  const averageQuery = useGlucoseAverage(hours);
  const highestQuery = useGlucoseHighest(hours);
  const lowestQuery = useGlucoseLowest(hours);
  const timeInRangeQuery = useGlucoseTimeInRange(hours);
  const gmiQuery = useGlucoseManagementIndicator(hours);

  const isLoading =
    averageQuery.isLoading ||
    highestQuery.isLoading ||
    lowestQuery.isLoading ||
    timeInRangeQuery.isLoading ||
    gmiQuery.isLoading;
  const hasError =
    averageQuery.isError ||
    highestQuery.isError ||
    lowestQuery.isError ||
    timeInRangeQuery.isError ||
    gmiQuery.isError;
  const isFetching =
    averageQuery.isFetching ||
    highestQuery.isFetching ||
    lowestQuery.isFetching ||
    timeInRangeQuery.isFetching ||
    gmiQuery.isFetching;

  if (isLoading) return <GlucoseLoadingState />;

  if (
    hasError ||
    !averageQuery.data ||
    !highestQuery.data ||
    !lowestQuery.data ||
    !timeInRangeQuery.data ||
    !gmiQuery.data
  ) {
    return (
      <GlucoseErrorState message={t("pages.user.glucose.errors.summary")} />
    );
  }

  return (
    <BentoTile
      title={t("pages.user.glucose.subpages.summary.title")}
      description={
        timeInRangeQuery.data.hours || hours
          ? t("pages.user.glucose.summary.period", {
              duration: formatGlucoseDuration(
                (timeInRangeQuery.data.hours || hours || 0) * 60 * 60 * 1000,
                i18n.language,
              ),
            })
          : t("pages.user.glucose.summary.periodAll")
      }
      className="relative"
    >
      <PanelLoadingOverlay visible={isFetching} />
      <div className="space-y-4">
        <GlucoseMetricGrid
          average={averageQuery.data}
          highest={highestQuery.data}
          lowest={lowestQuery.data}
          timeInRange={timeInRangeQuery.data}
        />

        <GmiTile gmi={gmiQuery.data} selectedRange={selectedRange} />
      </div>
    </BentoTile>
  );
}
