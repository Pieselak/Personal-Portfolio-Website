import { ArrowDown, ArrowUp, Clock, Gauge } from "lucide-react";
import { useTranslation } from "react-i18next";
import { MetricTile } from "@/app/components/ui/MetricTile.tsx";
import type {
  GetAverageGlucoseResponse,
  GetHighestGlucoseResponse,
  GetLowestGlucoseResponse,
  GetTimeInRangeResponse,
} from "@/app/api/generated-api.ts";
import { formatPercent } from "@/app/modules/User/Glucose/utils/glucoseFormatters.ts";

type GlucoseMetricGridProps = {
  average: GetAverageGlucoseResponse;
  highest: GetHighestGlucoseResponse;
  lowest: GetLowestGlucoseResponse;
  timeInRange: GetTimeInRangeResponse;
};

function metricValue(data: { isDataSufficient: boolean; value: number }) {
  return data.isDataSufficient ? data.value : "-";
}

export function GlucoseMetricGrid({
  timeInRange,
  average,
  highest,
  lowest,
}: GlucoseMetricGridProps) {
  const { t, i18n } = useTranslation();

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MetricTile
        label={t("pages.user.glucose.summary.timeInRange")}
        value={
          timeInRange.isDataSufficient
            ? `${formatPercent(timeInRange.percentageInRange, i18n.language)}%`
            : "-"
        }
        unit={
          timeInRange.isDataSufficient
            ? t("pages.user.glucose.ranges.inRange")
            : undefined
        }
        tone="green"
        icon={Clock}
      />
      <MetricTile
        label={t("pages.user.glucose.summary.average")}
        value={metricValue(average)}
        unit={average.isDataSufficient ? average.unit : undefined}
        tone="gray"
        icon={Gauge}
      />
      <MetricTile
        label={t("pages.user.glucose.summary.highest")}
        value={metricValue(highest)}
        unit={highest.isDataSufficient ? highest.unit : undefined}
        tone="orange"
        icon={ArrowUp}
      />
      <MetricTile
        label={t("pages.user.glucose.summary.lowest")}
        value={metricValue(lowest)}
        unit={lowest.isDataSufficient ? lowest.unit : undefined}
        tone="red"
        icon={ArrowDown}
      />
    </div>
  );
}
