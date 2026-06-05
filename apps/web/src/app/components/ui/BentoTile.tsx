import type { ComponentPropsWithoutRef, ReactNode } from "react";

type BentoTileProps = ComponentPropsWithoutRef<"section"> & {
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
};

export function BentoTile({
  eyebrow,
  title,
  description,
  action,
  children,
  className = "",
  ...props
}: BentoTileProps) {
  return (
    <section
      className={`rounded-tile border border-border bg-surface p-4 md:p-5 ${className}`}
      {...props}
    >
      {(eyebrow || title || description || action) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            {eyebrow && (
              <div className="mb-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-lg font-black leading-tight text-foreground md:text-xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
