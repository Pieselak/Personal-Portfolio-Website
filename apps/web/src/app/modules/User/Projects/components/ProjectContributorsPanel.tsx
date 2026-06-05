import { BentoTile } from "@/app/components/ui/BentoTile.tsx";
import type { ProjectDeveloper } from "@/app/modules/User/Projects/types/project.types.ts";

type ProjectContributorsPanelProps = {
  eyebrow: string;
  title: string;
  emptyMessage: string;
  developers?: ProjectDeveloper[];
};

export function ProjectContributorsPanel({
  eyebrow,
  title,
  emptyMessage,
  developers,
}: ProjectContributorsPanelProps) {
  return (
    <BentoTile eyebrow={eyebrow} title={title}>
      {developers && developers.length > 0 ? (
        <div className="grid gap-3">
          {developers.map((developer) => (
            <div
              key={developer.name}
              className="rounded-tile border border-border bg-surface-raised p-4"
            >
              <p className="font-black text-foreground">{developer.name}</p>
              <p className="mt-1 text-sm font-bold text-muted-foreground">
                {developer.role}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm font-bold text-muted-foreground">
          {emptyMessage}
        </p>
      )}
    </BentoTile>
  );
}
