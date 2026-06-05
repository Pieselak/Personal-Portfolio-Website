import { useTranslation } from "react-i18next";
import { getToneClasses } from "@/app/components/ui/tone.ts";
import type { RangeSegment } from "@/app/modules/User/Glucose/utils/glucoseDisplay.ts";
import { formatPercent } from "@/app/modules/User/Glucose/utils/glucoseFormatters.ts";

type TimeInRangeStackProps = {
  segments: RangeSegment[];
  compact?: boolean;
};

export function TimeInRangeStack({
  segments,
  compact = false,
}: TimeInRangeStackProps) {
  const { t, i18n } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="flex h-8 overflow-hidden rounded-control border border-border bg-surface-inset">
        {segments.map((segment) => {
          const toneClasses = getToneClasses(segment.tone);
          const value = Math.max(0, segment.value);

          return (
            <div
              key={segment.key}
              className={`flex min-w-0 items-center justify-center ${toneClasses.fill}`}
              style={{ width: `${value}%` }}
              title={`${t(segment.labelKey)}: ${formatPercent(
                value,
                i18n.language,
              )}%`}
            >
              {!compact && value >= 10 && (
                <span className="px-1 text-xs font-black text-white">
                  {formatPercent(value, i18n.language)}%
                </span>
              )}
            </div>
          );
        })}
      </div>

      {!compact && (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {segments.map((segment) => {
            const toneClasses = getToneClasses(segment.tone);

            return (
              <div
                key={segment.key}
                className="flex items-center justify-between gap-2 rounded-control border border-border bg-surface-raised px-3 py-2"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={`size-2.5 shrink-0 rounded-full ${toneClasses.fill}`}
                  />
                  <span className="truncate text-xs font-bold text-muted-foreground">
                    {t(segment.labelKey)}
                  </span>
                </div>
                <span className="text-xs font-black text-foreground">
                  {formatPercent(segment.value, i18n.language)}%
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
