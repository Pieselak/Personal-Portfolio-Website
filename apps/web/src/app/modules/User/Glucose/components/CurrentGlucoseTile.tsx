import { ArrowUp, CircleQuestionMark, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { GetCurrentGlucoseResponse } from "@/app/api/generated-api.ts";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";
import { StatusBadge } from "@/app/components/ui/StatusBadge.tsx";
import {
  formatGlucoseDate,
  formatGlucoseDuration,
} from "@/app/modules/User/Glucose/utils/glucoseFormatters.ts";
import {
  getGlucoseColorClasses,
  getGlucoseTone,
  getTrendIndicatorConfig,
} from "@/app/modules/User/Glucose/utils/glucoseDisplay.ts";

type CurrentGlucoseTileProps = {
  current: GetCurrentGlucoseResponse;
};

export function CurrentGlucoseTile({ current }: CurrentGlucoseTileProps) {
  const { t, i18n } = useTranslation();
  const tone = getGlucoseTone(current.color);
  const toneClasses = getGlucoseColorClasses(current.color);
  const trendConfig = getTrendIndicatorConfig(current.trend);
  const isStale = !current.isCurrent;

  return (
    <BentoTile
      className={`relative overflow-hidden ${isStale ? "opacity-70 grayscale" : ""}`}
      eyebrow={t("pages.user.glucose.current.title")}
      action={
        <StatusBadge tone={isStale ? "gray" : tone}>
          {isStale
            ? t("pages.user.glucose.current.stale")
            : t("pages.user.glucose.current.current")}
        </StatusBadge>
      }
    >
      <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <div className="flex items-start gap-4">
            <p
              className={`text-7xl font-black leading-none ${toneClasses.text}`}
            >
              {current.status === "computable"
                ? current.value
                : current.status === "low"
                  ? "Lo"
                  : "Hi"}
            </p>
            <div
              className={`mt-2 flex size-12 items-center justify-center rounded-control border ${toneClasses.bg} ${toneClasses.border} ${toneClasses.text}`}
              aria-label={t(
                `pages.user.glucose.current.trends.${current.trend}`,
              )}
            >
              <span
                className="relative flex size-8 items-center justify-center"
                style={{ transform: `rotate(${trendConfig.rotation}deg)` }}
              >
                {current.trend === "none" && (
                  <CircleQuestionMark className="size-7" />
                )}
                {current.trend !== "none" &&
                  Array.from({ length: trendConfig.arrowCount }).map(
                    (_, index) => (
                      <ArrowUp
                        key={index}
                        className="absolute size-7"
                        style={{
                          transform: `translateY(${index * 7 - (trendConfig.arrowCount - 1) * 3.5}px)`,
                        }}
                      />
                    ),
                  )}
              </span>
            </div>
          </div>
          <p className="mt-2 text-xl font-black text-muted-foreground">
            {current.status === "computable"
              ? current.unit
              : t("pages.user.glucose.current.outOfRange")}
          </p>
        </div>

        <div className="grid gap-2 text-sm sm:text-right">
          <p className="font-bold text-foreground">
            {t(`pages.user.glucose.current.trends.${current.trend}`)}
          </p>
          <p className="text-muted-foreground">
            {formatGlucoseDate(current.timestamp, i18n.language)}
          </p>
          <p className="inline-flex items-center gap-2 font-bold text-primary sm:justify-end">
            <RefreshCw className="size-4" />
            {formatGlucoseDuration(current.refreshIn, i18n.language)}
          </p>
        </div>
      </div>
    </BentoTile>
  );
}
