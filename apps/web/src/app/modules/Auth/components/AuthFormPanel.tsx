import type { ReactNode } from "react";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";

type AuthFormPanelProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function AuthFormPanel({ eyebrow, title, children }: AuthFormPanelProps) {
  return (
    <BentoTile className="mx-auto w-full max-w-full p-5 md:max-w-[30rem] md:p-6">
      <div className="mb-5 space-y-1">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </p>
        <h1 className="text-2xl font-black leading-tight text-foreground md:text-3xl">
          {title}
        </h1>
      </div>
      {children}
    </BentoTile>
  );
}
