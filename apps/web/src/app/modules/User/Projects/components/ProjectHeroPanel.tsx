import { StatusBadge } from "@/app/components/ui/StatusBadge.tsx";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";
import { projectStatusTone } from "@/app/modules/User/Projects/constants/projectStatus.ts";
import type { Project } from "@/app/modules/User/Projects/types/project.types.ts";

type ProjectHeroPanelProps = {
  project: Project;
  eyebrow: string;
  statusLabel: string;
};

export function ProjectHeroPanel({
  project,
  eyebrow,
  statusLabel,
}: ProjectHeroPanelProps) {
  return (
    <BentoTile
      eyebrow={eyebrow}
      title={project.title}
      action={
        <StatusBadge tone={projectStatusTone[project.status]}>
          {statusLabel}
        </StatusBadge>
      }
    >
      <div className="mt-4 flex flex-wrap gap-2">
        {(project.tags ?? []).map((tag) => (
          <span
            key={tag}
            className="rounded-control border border-border bg-surface-inset px-2.5 py-1 text-xs font-bold text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </BentoTile>
  );
}
