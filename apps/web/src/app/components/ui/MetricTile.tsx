import type { LucideIcon } from "lucide-react";
import { getToneClasses, type Tone } from "@/app/components/ui/tone.ts";

type MetricTileProps = {
  label: string;
  value: string | number;
  unit?: string;
  tone?: Tone;
  icon?: LucideIcon;
};

export function MetricTile({
  label,
  value,
  unit,
  tone = "gray",
  icon: Icon,
}: MetricTileProps) {
  const toneClasses = getToneClasses(tone);

  return (
    <div className="rounded-tile border border-border bg-surface-raised p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-muted-foreground">{label}</p>
        {Icon && (
          <span
            className={`flex size-10 items-center justify-center rounded-control border ${toneClasses.bg} ${toneClasses.border} ${toneClasses.text}`}
          >
            <Icon className="size-5" />
          </span>
        )}
      </div>
      <p className="text-3xl font-black leading-none text-foreground">
        {value}
      </p>
      {unit && (
        <p className="mt-1 text-sm font-bold text-muted-foreground">{unit}</p>
      )}
    </div>
  );
}
