import { BentoTile } from "@/app/components/ui/BentoTile.tsx";
import type { ProjectDeveloper } from "@/app/modules/User/Projects/types/project.types.ts";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ExternalLink } from "lucide-react";

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
  const { t } = useTranslation();
  return (
    <BentoTile eyebrow={eyebrow} title={title}>
      {developers && developers.length > 0 ? (
        <div className="grid gap-3">
          {developers.map((developer) => (
            <div
              key={developer.name}
              className="flex justify-between rounded-tile border border-border bg-surface-raised p-4"
            >
              <div>
                <p className="font-black text-foreground">{developer.name}</p>
                <p className="mt-1 text-sm font-bold text-muted-foreground">
                  {developer.role}
                </p>
              </div>

              {developer.profileUrl && (
                <Link
                  to={developer.profileUrl}
                  className="flex gap-1 inline-flex items-center text-sm font-bold text-primary"
                >
                  {t("pages.user.projects.details.view")}
                  <ExternalLink className="size-4" />
                </Link>
              )}
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
