import type { InputHTMLAttributes, ReactNode } from "react";

type AuthTextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: ReactNode;
  error?: string;
};

export function AuthTextField({
  label,
  icon,
  error,
  id,
  className = "",
  ...props
}: AuthTextFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-black text-foreground">
        {label}
      </label>
      <div
        className={`flex min-h-11 items-center gap-3 rounded-control border bg-surface px-3 transition-[border-color,background-color] duration-200 focus-within:border-ring focus-within:bg-surface-raised ${
          error ? "border-destructive" : "border-border"
        } ${className}`}
      >
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <input
          id={id}
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-foreground outline-none placeholder:text-muted-foreground"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm font-semibold text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
