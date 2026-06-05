import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ShieldCheckIcon } from "lucide-react";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";

type AuthPanelProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footerLabel: string;
  footerAction: string;
  footerTo: string;
};

export function AuthPanel({
  eyebrow,
  title,
  description,
  children,
  footerLabel,
  footerAction,
  footerTo,
}: AuthPanelProps) {
  return (
    <div className="grid w-full gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <BentoTile
        eyebrow={eyebrow}
        title={title}
        description={description}
        className="min-h-[32rem]"
      >
        {children}
      </BentoTile>

      <aside className="rounded-tile border border-border bg-surface-inset p-4 md:p-5">
        <div className="flex h-full flex-col justify-between gap-8">
          <div className="space-y-4">
            <div className="flex size-11 items-center justify-center rounded-control border border-border-strong bg-surface text-primary">
              <ShieldCheckIcon className="size-5" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-muted-foreground">
                Auth
              </p>
              <p className="text-2xl font-black leading-tight text-foreground">
                Patryk Znamirowski
              </p>
              <p className="text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </div>
          </div>

          <div className="rounded-tile border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-muted-foreground">
              {footerLabel}
            </p>
            <Link
              to={footerTo}
              className="mt-2 inline-flex min-h-10 items-center rounded-control border border-border px-4 text-sm font-black text-foreground transition-[border-color,background-color] duration-200 hover:border-ring hover:bg-surface-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {footerAction}
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
