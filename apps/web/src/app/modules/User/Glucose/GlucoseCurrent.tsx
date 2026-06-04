import { useTranslation } from "react-i18next";
import { Activity, Clock, Radio, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import {
  useGlucoseCurrent,
  useGlucoseSensor,
} from "@/app/api/queries/useGlucose.ts";
import { GlucoseTrend } from "@/app/api/generated-api.ts";
import {
  formatGlucoseDate,
  formatGlucoseDuration,
  getGlucoseColorClasses,
} from "@/app/modules/User/Glucose/Glucose.utils.ts";
import {
  GlucoseErrorState,
  GlucoseLoadingState,
} from "@/app/modules/User/Glucose/GlucoseStates.tsx";
import { Badge, Card, MetricCard } from "@/app/components/ui.tsx";
import { cn } from "@/app/components/cn.ts";

type TrendIndicatorConfig = {
  arrowCount: 1 | 2;
  positionClassName: string;
  rotation: number;
};

function getTrendIndicatorConfig(trend: GlucoseTrend): TrendIndicatorConfig {
  switch (trend) {
    case GlucoseTrend.RisingFast:
      return {
        arrowCount: 2,
        positionClassName: "top-1 left-1/2 -translate-x-1/2",
        rotation: 0,
      };
    case GlucoseTrend.Rising:
      return {
        arrowCount: 1,
        positionClassName: "top-1 left-1/2 -translate-x-1/2",
        rotation: 0,
      };
    case GlucoseTrend.RisingSlow:
      return {
        arrowCount: 1,
        positionClassName: "right-4 top-11",
        rotation: 45,
      };
    case GlucoseTrend.FallingSlow:
      return {
        arrowCount: 1,
        positionClassName: "bottom-11 right-4",
        rotation: 135,
      };
    case GlucoseTrend.Falling:
      return {
        arrowCount: 1,
        positionClassName: "bottom-1 left-1/2 -translate-x-1/2",
        rotation: 180,
      };
    case GlucoseTrend.FallingFast:
      return {
        arrowCount: 2,
        positionClassName: "bottom-1 left-1/2 -translate-x-1/2",
        rotation: 180,
      };
    default:
      return {
        arrowCount: 1,
        positionClassName: "right-1 top-1/2 -translate-y-1/2",
        rotation: 90,
      };
  }
}

export function GlucoseCurrent() {
  const { t, i18n } = useTranslation();
  const currentQuery = useGlucoseCurrent();
  const sensorQuery = useGlucoseSensor();

  if (currentQuery.isLoading) return <GlucoseLoadingState />;

  if (currentQuery.isError || !currentQuery.data) {
    return (
      <GlucoseErrorState message={t("pages.user.glucose.errors.current")} />
    );
  }

  const current = currentQuery.data;
  const sensor = sensorQuery.data;
  const colorClasses = getGlucoseColorClasses(current.color);
  const trendConfig = getTrendIndicatorConfig(current.trend);

  return (
    <Card className="grid gap-6 p-5 shadow-md lg:grid-cols-[minmax(260px,360px)_1fr]">
      <div className="flex flex-col items-center justify-center gap-4">
        <motion.div
          className="relative flex aspect-square w-full max-w-72 items-center justify-center p-9"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className={`absolute z-10 flex items-center justify-center ${trendConfig.positionClassName}`}
            aria-label={t(`pages.user.glucose.current.trends.${current.trend}`)}
          >
            <div
              className="relative h-10 w-10"
              style={{ transform: `rotate(${trendConfig.rotation}deg)` }}
            >
              {Array.from({ length: trendConfig.arrowCount }).map(
                (_, index) => (
                  <span
                    key={index}
                    className="absolute left-1/2 size-0 -translate-x-1/2 border-x-[13px] border-b-[23px] border-x-transparent"
                    style={{
                      borderBottomColor: colorClasses.stroke,
                      top: `${index * 9}px`,
                      filter: "drop-shadow(0 1px 0 var(--border))",
                    }}
                  />
                ),
              )}
            </div>
          </div>

          <div
            className={cn(
              "flex aspect-square w-full flex-col items-center justify-center rounded-full border-[5px] p-2 shadow-lg",
              colorClasses.border,
              colorClasses.bg,
            )}
          >
            <div className="flex size-full flex-col items-center justify-center rounded-full border border-card/90 bg-card/35">
              <p
                className={`text-5xl font-bold uppercase leading-none md:text-6xl ${colorClasses.text}`}
              >
                {current.value}
              </p>
              <p
                className={`mt-2 text-xl font-bold leading-none ${colorClasses.text}`}
              >
                {current.unit}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="text-center">
          <p className="text-sm font-semibold text-foreground">
            {t(`pages.user.glucose.current.trends.${current.trend}`)}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatGlucoseDate(current.timestamp, i18n.language)}
          </p>
        </div>
      </div>

      <div className="grid content-center gap-4 md:grid-cols-2">
        <MetricCard
          icon={Activity}
          tone={current.isCurrent ? "success" : "warning"}
          label={t("pages.user.glucose.current.status")}
          value={
            current.isCurrent
              ? t("pages.user.glucose.current.current")
              : t("pages.user.glucose.current.stale")
          }
          detail={`${t("pages.user.glucose.current.readAt")}: ${formatGlucoseDate(
            current.timestamp,
            i18n.language,
          )}`}
        />

        <MetricCard
          icon={RefreshCw}
          tone="accent"
          label={t("pages.user.glucose.current.refresh")}
          value={formatGlucoseDuration(current.refreshIn, i18n.language)}
          detail={formatGlucoseDate(current.refreshAt, i18n.language)}
        />

        <Card className="p-4 md:col-span-2">
          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
            <Radio className="size-4" />
            {t("pages.user.glucose.current.sensor")}
          </div>

          {sensorQuery.isLoading ? (
            <p className="text-sm text-muted-foreground">
              {t("pages.user.glucose.loading")}
            </p>
          ) : sensorQuery.isError || !sensor ? (
            <p className="text-sm text-destructive">
              {t("pages.user.glucose.current.noSensor")}
            </p>
          ) : (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {sensor.image && (
                <img
                  src={`${import.meta.env.VITE_API_URL}/${sensor.image}`}
                  alt={sensor.name ?? t("pages.user.glucose.current.sensor")}
                  className="h-20 w-20 rounded-xl border border-border bg-card object-contain p-2"
                />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-primary">
                    {sensor.name ?? t("pages.user.glucose.current.noSensor")}
                  </p>
                  <Badge tone={sensor.isActive ? "success" : "neutral"}>
                    {sensor.isActive
                      ? t("pages.user.glucose.current.active")
                      : t("pages.user.glucose.current.inactive")}
                  </Badge>
                </div>
                <div className="mt-2 grid gap-1 text-sm text-muted-foreground sm:grid-cols-2">
                  <span>
                    {t("pages.user.glucose.current.lastUpload")}:{" "}
                    {formatGlucoseDate(sensor.lastUploadAt, i18n.language)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {t("pages.user.glucose.current.expiresIn")}:{" "}
                    {formatGlucoseDuration(sensor.expireIn, i18n.language)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </Card>
  );
}
