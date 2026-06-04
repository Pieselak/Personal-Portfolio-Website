import { useTranslation } from "react-i18next";
import { useGlucoseTimeInRange } from "@/app/api/queries/useGlucose.ts";
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
import { Card } from "@/app/components/ui.tsx";

export function GlucoseTimeInRange() {
  const { t, i18n } = useTranslation();
  const timeInRangeQuery = useGlucoseTimeInRange(GLUCOSE_STATISTICS_HOURS);

  if (timeInRangeQuery.isLoading) return <GlucoseLoadingState />;

  if (timeInRangeQuery.isError || !timeInRangeQuery.data) {
    return (
      <GlucoseErrorState message={t("pages.user.glucose.errors.timeInRange")} />
    );
  }

  const timeInRange = timeInRangeQuery.data;

  if (!timeInRange.isDataSufficient) {
    return (
      <GlucoseMessageState
        message={t("pages.user.glucose.errors.insufficientData")}
      />
    );
  }

  const formatter = new Intl.NumberFormat(i18n.language, {
    maximumFractionDigits: 1,
  });
  const segments = getTimeInRangeSegments(timeInRange);

  return (
    <motion.section
      className="space-y-5 rounded-lg border border-border bg-card p-6 shadow-sm md:p-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-semibold text-foreground">
          {t("pages.user.glucose.subpages.timeInRange.title")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("pages.user.glucose.timeInRange.period", {
            hours: timeInRange.hours ?? GLUCOSE_STATISTICS_HOURS,
          })}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-[88px_1fr]">
        <Card className="flex min-h-72 items-stretch justify-center p-2">
          <div className="flex h-full w-full flex-col overflow-hidden rounded-md border border-border bg-secondary">
            {segments.map((segment) => (
              <div
                key={segment.key}
                className={`${segment.className} transition-[height] duration-500`}
                style={{ height: `${Math.max(0, segment.value)}%` }}
                title={`${t(segment.labelKey)}: ${formatter.format(
                  segment.value,
                )}%`}
              />
            ))}
          </div>
        </Card>

        <div className="flex flex-col justify-center gap-3 sm:grid-cols-2">
          {segments.map((segment) => (
            <div
              key={segment.key}
              className="rounded-md border border-border bg-secondary/45 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={`size-3 shrink-0 rounded-full ${segment.className}`}
                  />
                  <p className="truncate text-sm font-medium text-muted-foreground">
                    {t(segment.labelKey)}
                  </p>
                </div>
                <p className="text-lg font-semibold text-foreground">
                  {formatter.format(segment.value)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
