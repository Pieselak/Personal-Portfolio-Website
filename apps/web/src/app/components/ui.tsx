import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { AlertCircle, LoaderCircle, type LucideIcon } from "lucide-react";
import { cn } from "@/app/components/cn.ts";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-[background-color,border-color,color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "border-primary bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "secondary" &&
          "border-border bg-card text-foreground hover:border-ring hover:bg-secondary",
        variant === "ghost" &&
          "border-transparent bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

export function IconButton({ className, label, ...props }: IconButtonProps) {
  return (
    <button
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-[background-color,border-color,color] duration-150 hover:border-ring hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    />
  );
}

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card",
        className,
      )}
      {...props}
    />
  );
}

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "success" | "warning" | "danger" | "accent";
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium",
        tone === "neutral" && "border-border bg-secondary text-muted-foreground",
        tone === "success" && "border-green-border bg-green-bg text-green-text",
        tone === "warning" &&
          "border-yellow-border bg-yellow-bg text-yellow-text",
        tone === "danger" && "border-red-border bg-red-bg text-red-text",
        tone === "accent" && "border-accent/40 bg-accent/10 text-accent",
        className,
      )}
      {...props}
    />
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "space-y-3",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-xs font-medium text-accent">
          {eyebrow}
        </p>
      )}
      <h1 className="text-4xl font-semibold tracking-[-0.01em] leading-tight text-foreground md:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </header>
  );
}

type MetricCardProps = {
  label: string;
  value: ReactNode;
  detail?: ReactNode;
  icon?: LucideIcon;
  tone?: "neutral" | "success" | "warning" | "danger" | "accent";
};

export function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = "neutral",
}: MetricCardProps) {
  return (
    <Card className="p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <p className="text-xs font-medium text-muted-foreground">
          {label}
        </p>
        {Icon && (
          <span
            className={cn(
              "flex size-9 items-center justify-center rounded-md border",
              tone === "neutral" && "border-border bg-secondary text-muted-foreground",
              tone === "success" && "border-green-border bg-green-bg text-green-text",
              tone === "warning" &&
                "border-yellow-border bg-yellow-bg text-yellow-text",
              tone === "danger" && "border-red-border bg-red-bg text-red-text",
              tone === "accent" && "border-accent/40 bg-accent/10 text-accent",
            )}
          >
            <Icon className="size-4.5" />
          </span>
        )}
      </div>
      <p className="text-3xl font-semibold tracking-tight text-foreground">
        {value}
      </p>
      {detail && (
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{detail}</p>
      )}
    </Card>
  );
}

type StatePanelProps = {
  title?: string;
  message: string;
  tone?: "loading" | "error" | "empty";
};

export function StatePanel({ title, message, tone = "empty" }: StatePanelProps) {
  const isError = tone === "error";
  const isLoading = tone === "loading";

  return (
    <Card
      className={cn(
        "flex min-h-44 flex-col items-center justify-center p-8 text-center",
        isError && "border-destructive/40 bg-destructive/10",
      )}
    >
      {isLoading && (
        <LoaderCircle className="mb-3 size-7 animate-spin text-accent" />
      )}
      {isError && <AlertCircle className="mb-3 size-7 text-destructive" />}
      {title && (
        <p className="text-2xl font-semibold text-foreground">
          {title}
        </p>
      )}
      <p
        className={cn(
          "max-w-xl text-sm leading-6 text-muted-foreground",
          isError && "text-destructive",
        )}
      >
        {message}
      </p>
    </Card>
  );
}
