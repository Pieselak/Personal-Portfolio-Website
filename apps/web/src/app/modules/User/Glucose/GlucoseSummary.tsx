import { useTranslation } from "react-i18next";
import { ArrowDown, ArrowUp, Clock, Gauge } from "lucide-react";
import {
  useGlucoseAverage,
  useGlucoseHighest,
  useGlucoseLowest,
  useGlucoseTimeInRange,
} from "@/app/api/queries/useGlucose.ts";
import type { GetAverageGlucoseResponse } from "@/app/api/generated-api.ts";
import {
  GLUCOSE_STATISTICS_HOURS,
  getTimeInRangeSegments,
} from "@/app/modules/User/Glucose/Glucose.utils.ts";
import {
  GlucoseErrorState,
  GlucoseLoadingState,
  GlucoseMessageState,
} from "@/app/modules/User/Glucose/GlucoseStates.tsx";
import { motion } from "framer-motion";
import { Card, MetricCard } from "@/app/components/ui.tsx";

export function GlucoseSummary() {
  const { t, i18n } = useTranslation();
  const averageQuery = useGlucoseAverage(GLUCOSE_STATISTICS_HOURS);
  const highestQuery = useGlucoseHighest(GLUCOSE_STATISTICS_HOURS);
  const lowestQuery = useGlucoseLowest(GLUCOSE_STATISTICS_HOURS);
  const timeInRangeQuery = useGlucoseTimeInRange(GLUCOSE_STATISTICS_HOURS);

  const isLoading =
    averageQuery.isLoading ||
    highestQuery.isLoading ||
    lowestQuery.isLoading ||
    timeInRangeQuery.isLoading;
  const hasError =
    averageQuery.isError ||
    highestQuery.isError ||
    lowestQuery.isError ||
    timeInRangeQuery.isError;

  if (isLoading) return <GlucoseLoadingState />;

  if (
    hasError ||
    !averageQuery.data ||
    !highestQuery.data ||
    !lowestQuery.data ||
    !timeInRangeQuery.data
  ) {
    return (
      <GlucoseErrorState message={t("pages.user.glucose.errors.summary")} />
    );
  }

  const average = averageQuery.data;
  const highest = highestQuery.data;
  const lowest = lowestQuery.data;
  const timeInRange = timeInRangeQuery.data;
  const hasSufficientData =
    average.isDataSufficient &&
    highest.isDataSufficient &&
    lowest.isDataSufficient &&
    timeInRange.isDataSufficient;

  if (!hasSufficientData) {
    return (
      <GlucoseMessageState
        message={t("pages.user.glucose.errors.insufficientData")}
      />
    );
  }

  const percentFormatter = new Intl.NumberFormat(i18n.language, {
    maximumFractionDigits: 1,
  });
  const rangeSegments = getTimeInRangeSegments(timeInRange);
  const metricCards: Array<{
    label: string;
    data: GetAverageGlucoseResponse;
    icon: typeof Gauge;
    tone: "accent" | "warning";
  }> = [
    {
      label: t("pages.user.glucose.summary.average"),
      data: average,
      icon: Gauge,
      tone: "accent" as const,
    },
    {
      label: t("pages.user.glucose.summary.highest"),
      data: highest,
      icon: ArrowUp,
      tone: "warning" as const,
    },
    {
      label: t("pages.user.glucose.summary.lowest"),
      data: lowest,
      icon: ArrowDown,
      tone: "warning" as const,
    },
  ];

  return (
    <motion.section
      className="space-y-5 rounded-lg border border-border bg-card p-6 shadow-sm md:p-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-semibold text-foreground">
          {t("pages.user.glucose.subpages.summary.title")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("pages.user.glucose.summary.period", {
            hours: average.hours ?? GLUCOSE_STATISTICS_HOURS,
          })}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {metricCards.map((metric) => {
          const Icon = metric.icon;

          return (
            <MetricCard
              key={metric.label}
              icon={Icon}
              tone={metric.tone}
              label={metric.label}
              value={metric.data.value}
              detail={metric.data.unit}
            />
          );
        })}
      </div>

      <Card className="p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">
              {t("pages.user.glucose.summary.timeInRange")}
            </p>
            <p className="text-3xl font-semibold text-foreground">
              {percentFormatter.format(timeInRange.percentageInRange)}%
            </p>
          </div>
          <span className="flex size-10 items-center justify-center rounded-md border border-green-border bg-green-bg text-green-text">
            <Clock className="size-5" />
          </span>
        </div>

        <div className="flex h-3 overflow-hidden rounded-full bg-secondary">
          {rangeSegments.map((segment) => (
            <div
              key={segment.key}
              className={segment.className}
              style={{ width: `${Math.max(0, segment.value)}%` }}
              title={`${t(segment.labelKey)}: ${percentFormatter.format(
                segment.value,
              )}%`}
            />
          ))}
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {rangeSegments.map((segment) => (
            <div
              key={segment.key}
              className="flex items-center justify-between gap-2 rounded-md border border-border/60 bg-secondary/45 px-3 py-2"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className={`size-2.5 shrink-0 rounded-full ${segment.className}`}
                />
                <span className="truncate text-xs text-muted-foreground">
                  {t(segment.labelKey)}
                </span>
              </div>
              <span className="text-xs font-semibold text-foreground">
                {percentFormatter.format(segment.value)}%
              </span>
            </div>
          ))}
        </div>
      </Card>
    </motion.section>
  );
}
