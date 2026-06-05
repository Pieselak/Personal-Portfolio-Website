import { Calendar, ExternalLink, Lock } from "lucide-react";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";
import { Button } from "@/app/components/ui/Button.tsx";
import type { Project } from "@/app/modules/User/Projects/types/project.types.ts";

type ProjectMetaPanelProps = {
  project: Project;
  eyebrow: string;
  title: string;
  startedAtLabel: string;
  completedAtLabel: string;
  sourceOpenLabel: string;
  sourceClosedLabel: string;
  sourceUnavailableLabel: string;
};

export function ProjectMetaPanel({
  project,
  eyebrow,
  title,
  startedAtLabel,
  completedAtLabel,
  sourceOpenLabel,
  sourceClosedLabel,
  sourceUnavailableLabel,
}: ProjectMetaPanelProps) {
  return (
    <BentoTile eyebrow={eyebrow} title={title}>
      <div className="space-y-3">
        {project.startDate && (
          <div className="rounded-tile border border-border bg-surface-raised p-4">
            <p className="flex items-center gap-2 text-sm font-black text-muted-foreground">
              <Calendar className="size-4" />
              {startedAtLabel}
            </p>
            <p className="mt-2 font-black text-foreground">
              {project.startDate}
            </p>
          </div>
        )}

        {project.completeDate && (
          <div className="rounded-tile border border-border bg-surface-raised p-4">
            <p className="flex items-center gap-2 text-sm font-black text-muted-foreground">
              <Calendar className="size-4" />
              {completedAtLabel}
            </p>
            <p className="mt-2 font-black text-foreground">
              {project.completeDate}
            </p>
          </div>
        )}

        {project.sourceCodeOpen && project.sourceCodeUrl ? (
          <a
            href={project.sourceCodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button className="w-full" variant="primary">
              <ExternalLink className="size-4" />
              {sourceOpenLabel}
            </Button>
          </a>
        ) : (
          <div className="flex items-center justify-center gap-2 rounded-control border border-border bg-surface-inset px-4 py-3 text-sm font-black text-muted-foreground">
            <Lock className="size-4" />
            {project.sourceCodeOpen ? sourceUnavailableLabel : sourceClosedLabel}
          </div>
        )}
      </div>
    </BentoTile>
  );
}
