import { getToneClasses, type Tone } from "@/app/components/ui/tone.ts";

type ProgressBarProps = {
  value: number;
  tone?: Tone;
  label?: string;
};

export function ProgressBar({ value, tone = "green", label }: ProgressBarProps) {
  const toneClasses = getToneClasses(tone);
  const normalizedValue = Math.min(100, Math.max(0, value));

  return (
    <div>
      {label && (
        <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
          <span>{label}</span>
          <span>{Math.round(normalizedValue)}%</span>
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-full border border-border bg-surface-inset">
        <div
          className={`h-full rounded-full ${toneClasses.fill}`}
          style={{ width: `${normalizedValue}%` }}
        />
      </div>
    </div>
  );
}
