import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

type ProjectBackLinkProps = {
  label: string;
};

export function ProjectBackLink({ label }: ProjectBackLinkProps) {
  return (
    <Link
      to="/projects"
      className="inline-flex items-center gap-2 rounded-control border border-border bg-surface px-3 py-2 text-sm font-bold text-muted-foreground transition-[border-color,color,background-color] duration-200 hover:border-ring hover:bg-surface-raised hover:text-foreground"
    >
      <ArrowLeft className="size-4" />
      {label}
    </Link>
  );
}
