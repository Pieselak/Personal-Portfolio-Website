import type { ReactNode } from "react";

type AdminShellProps = {
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function AdminShell({
  title,
  description,
  actions,
  children,
}: AdminShellProps) {
  return (
    <section className="space-y-4">
      <header className="grid gap-3 rounded-tile border border-border bg-surface p-5 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
            Admin
          </p>
          <h1 className="mt-1 text-3xl font-black tracking-tight">{title}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
        {actions}
      </header>
      {children}
    </section>
  );
}
