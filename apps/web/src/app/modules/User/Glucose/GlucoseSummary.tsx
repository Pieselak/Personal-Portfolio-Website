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
    className: string;
  }> = [
    {
      label: t("pages.user.glucose.summary.average"),
      data: average,
      icon: Gauge,
      className: "border-blue-border bg-blue-bg text-blue-text",
    },
    {
      label: t("pages.user.glucose.summary.highest"),
      data: highest,
      icon: ArrowUp,
      className: "border-yellow-border bg-yellow-bg text-yellow-text",
    },
    {
      label: t("pages.user.glucose.summary.lowest"),
      data: lowest,
      icon: ArrowDown,
      className: "border-orange-border bg-orange-bg text-orange-text",
    },
  ];

  return (
    <motion.section
      className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-primary">
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
            <div
              key={metric.label}
              className="rounded-xl border border-border bg-muted/40 p-4"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </p>
                <span
                  className={`flex size-10 items-center justify-center rounded-xl border ${metric.className}`}
                >
                  <Icon className="size-5" />
                </span>
              </div>
              <p className="text-3xl font-bold text-primary">
                {metric.data.value}
              </p>
              <p className="text-sm font-medium text-muted-foreground">
                {metric.data.unit}
              </p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-border bg-muted/40 p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {t("pages.user.glucose.summary.timeInRange")}
            </p>
            <p className="text-3xl font-bold text-primary">
              {percentFormatter.format(timeInRange.percentageInRange)}%
            </p>
          </div>
          <span className="flex size-10 items-center justify-center rounded-xl border border-green-border bg-green-bg text-green-text">
            <Clock className="size-5" />
          </span>
        </div>

        <div className="flex h-3 overflow-hidden rounded-full bg-card">
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
              className="flex items-center justify-between gap-2 rounded-lg border border-border/60 bg-card/60 px-3 py-2"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className={`size-2.5 shrink-0 rounded-full ${segment.className}`}
                />
                <span className="truncate text-xs text-muted-foreground">
                  {t(segment.labelKey)}
                </span>
              </div>
              <span className="text-xs font-semibold text-primary">
                {percentFormatter.format(segment.value)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
