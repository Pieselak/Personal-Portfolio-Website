import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export function PageShell({ children, className = "" }: PageShellProps) {
  return <div className={`w-full space-y-4 md:space-y-5 ${className}`}>{children}</div>;
}
