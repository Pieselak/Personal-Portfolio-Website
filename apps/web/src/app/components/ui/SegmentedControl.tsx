import type { ReactNode } from "react";

export type SegmentedControlOption<T extends string> = {
  value: T;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
};

type SegmentedControlProps<T extends string> = {
  options: Array<SegmentedControlOption<T>>;
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  className?: string;
  mobileLayout?: "wrap" | "stack" | "grid";
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className = "",
  mobileLayout = "wrap",
}: SegmentedControlProps<T>) {
  const layoutClasses = {
    wrap: "inline-flex max-w-full flex-wrap",
    stack: "flex w-full flex-col sm:inline-flex sm:w-auto sm:flex-row sm:flex-wrap",
    grid: "grid w-full grid-cols-3 sm:inline-flex sm:w-auto sm:flex-wrap",
  }[mobileLayout];

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`${layoutClasses} gap-1 rounded-tile border border-border bg-surface-inset p-1 ${className}`}
    >
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={option.disabled}
            onClick={() => onChange(option.value)}
            className={`inline-flex min-h-9 items-center justify-center gap-2 rounded-control border px-3 text-sm font-bold transition-[background-color,border-color,color,transform] duration-200 ease-premium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 ${
              mobileLayout !== "wrap" ? "w-full sm:w-auto" : ""
            } ${
              isActive
                ? "border-border-strong bg-surface text-primary"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
            }`}
          >
            {option.icon}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
