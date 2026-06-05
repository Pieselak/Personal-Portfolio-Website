import type { InputHTMLAttributes, ReactNode } from "react";

type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  action?: ReactNode;
};

export function AuthField({
  label,
  error,
  action,
  className = "",
  id,
  ...props
}: AuthFieldProps) {
  const errorId = error && id ? `${id}-error` : undefined;

  return (
    <label className="block space-y-2" htmlFor={id}>
      <span className="flex min-h-5 items-center justify-between gap-3 text-sm font-black text-foreground">
        <span>{label}</span>
        {action}
      </span>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={`min-h-11 w-full rounded-control border bg-surface px-3 text-sm font-bold text-foreground outline-none transition-[background-color,border-color,color] duration-200 placeholder:text-muted-foreground/75 focus:border-ring focus:bg-surface-raised disabled:cursor-not-allowed disabled:opacity-60 ${
          error ? "border-destructive" : "border-border"
        } ${className}`}
        {...props}
      />
      {error && (
        <span id={errorId} className="block text-xs font-bold text-destructive">
          {error}
        </span>
      )}
    </label>
  );
}
