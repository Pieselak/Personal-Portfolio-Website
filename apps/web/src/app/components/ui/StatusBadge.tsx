import { getToneClasses, type Tone } from "@/app/components/ui/tone.ts";

type StatusBadgeProps = {
  tone: Tone;
  children: string;
  className?: string;
};

export function StatusBadge({
  tone,
  children,
  className = "",
}: StatusBadgeProps) {
  const toneClasses = getToneClasses(tone);

  return (
    <span
      className={`inline-flex items-center rounded-control border px-2.5 py-1 text-xs font-black uppercase tracking-[0.12em] ${toneClasses.bg} ${toneClasses.border} ${toneClasses.text} ${className}`}
    >
      {children}
    </span>
  );
}
