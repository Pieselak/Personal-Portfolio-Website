import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

type AuthPasswordFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: ReactNode;
  error?: string;
  showLabel: string;
  hideLabel: string;
};

export function AuthPasswordField({
  label,
  icon,
  error,
  id,
  showLabel,
  hideLabel,
  ...props
}: AuthPasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ToggleIcon = isVisible ? EyeOffIcon : EyeIcon;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-black text-foreground">
        {label}
      </label>
      <div
        className={`flex min-h-11 items-center gap-3 rounded-control border bg-surface px-3 transition-[border-color,background-color] duration-200 focus-within:border-ring focus-within:bg-surface-raised ${
          error ? "border-destructive" : "border-border"
        }`}
      >
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <input
          id={id}
          type={isVisible ? "text" : "password"}
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-foreground outline-none placeholder:text-muted-foreground"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        <button
          type="button"
          className="rounded-control border border-transparent p-1.5 text-muted-foreground transition-[border-color,color] duration-200 hover:border-border hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          onClick={() => setIsVisible((value) => !value)}
          aria-label={isVisible ? hideLabel : showLabel}
        >
          <ToggleIcon className="size-4" />
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm font-semibold text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
