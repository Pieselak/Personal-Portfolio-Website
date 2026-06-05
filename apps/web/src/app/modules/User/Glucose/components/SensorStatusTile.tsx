import { Battery, BatteryWarning, ClockIcon, CloudSync, RadioIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { GetSensorDataResponse } from "@/app/api/generated-api.ts";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";
import { ProgressBar } from "@/app/components/ui/ProgressBar.tsx";
import { StatusBadge } from "@/app/components/ui/StatusBadge.tsx";
import {
  formatGlucoseDate,
  formatGlucoseDuration,
} from "@/app/modules/User/Glucose/utils/glucoseFormatters.ts";
import { getSensorLifePercent } from "@/app/modules/User/Glucose/utils/glucoseDisplay.ts";

type SensorStatusTileProps = {
  sensor?: GetSensorDataResponse;
};

export function SensorStatusTile({ sensor }: SensorStatusTileProps) {
  const { t, i18n } = useTranslation();

  if (!sensor) {
    return (
      <BentoTile eyebrow={t("pages.user.glucose.current.sensor")}>
        <p className="text-sm font-bold text-muted-foreground">
          {t("pages.user.glucose.current.noSensor")}
        </p>
      </BentoTile>
    );
  }

  const lifePercent = getSensorLifePercent(
    sensor.activatedAt,
    sensor.expireAt,
    sensor.expireIn,
  );
  const isExpiringSoon = (sensor.expireIn ?? 0) <= 86400000;
  const BatteryIcon = isExpiringSoon ? BatteryWarning : Battery;

  return (
    <BentoTile
      eyebrow={t("pages.user.glucose.current.sensor")}
      title={sensor.name ?? t("pages.user.glucose.current.noSensor")}
      action={
        <StatusBadge tone={sensor.isActive ? "green" : "gray"}>
          {sensor.isActive
            ? t("pages.user.glucose.current.active")
            : t("pages.user.glucose.current.inactive")}
        </StatusBadge>
      }
    >
      <div className="grid gap-4 sm:grid-cols-[auto_1fr]">
        {sensor.image ? (
          <img
            src={`${import.meta.env.VITE_API_URL}/${sensor.image}`}
            alt={sensor.name ?? t("pages.user.glucose.current.sensor")}
            className="size-20 rounded-control border border-border bg-surface-inset object-contain p-2"
          />
        ) : (
          <div className="flex size-20 items-center justify-center rounded-control border border-border bg-surface-inset">
            <RadioIcon className="size-8 text-muted-foreground" />
          </div>
        )}

        <div className="min-w-0 space-y-4">
          <div className="grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
            <div>
              <p className="flex items-center gap-1 font-bold text-foreground">
                <CloudSync className="size-4" />
                {t("pages.user.glucose.current.lastUpload")}
              </p>
              <p>{formatGlucoseDate(sensor.lastUploadAt, i18n.language)}</p>
            </div>
            <div>
              <p className="flex items-center gap-1 font-bold text-foreground">
                <ClockIcon className="size-4" />
                {t("pages.user.glucose.current.activatedAt")}
              </p>
              <p>{formatGlucoseDate(sensor.activatedAt, i18n.language)}</p>
            </div>
            <div>
              <p className="flex items-center gap-1 font-bold text-foreground">
                <BatteryIcon className="size-4" />
                {t("pages.user.glucose.current.expiresIn")}
              </p>
              <p>{formatGlucoseDuration(sensor.expireIn, i18n.language)}</p>
            </div>
          </div>

          <ProgressBar
            value={lifePercent}
            tone={isExpiringSoon ? "red" : "green"}
            label={t("pages.user.glucose.current.sensorLife", {
              defaultValue: "Sensor life",
            })}
          />
        </div>
      </div>
    </BentoTile>
  );
}
