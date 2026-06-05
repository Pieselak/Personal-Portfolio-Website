import type { ComponentType } from "react";

type LanguageCardProps = {
  code: string;
  name: string;
  flag: ComponentType<{ className?: string }>;
  isActive: boolean;
  onSelect: () => void;
};

export function LanguageCard({
  code,
  name,
  flag: Flag,
  isActive,
  onSelect,
}: LanguageCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group flex min-h-24 w-full items-center justify-between gap-4 rounded-tile border bg-surface p-4 text-left transition-[background-color,border-color,color,transform] duration-200 ease-premium hover:border-ring hover:bg-surface-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
        isActive ? "border-border-strong text-primary" : "border-border text-foreground"
      }`}
    >
      <div className="min-w-0 space-y-2">
        <p className="truncate text-lg font-black leading-tight text-foreground">
          {name}
        </p>
        <span className="rounded-control border border-border bg-surface-inset px-2 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          {code.toUpperCase()}
        </span>
      </div>

      <Flag className="size-11 shrink-0 rounded-control border border-border bg-surface-inset p-0.5" />
    </button>
  );
}
