import { ArrowRight, ExternalLink, GitBranch, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { StatusBadge } from "@/app/components/ui/StatusBadge.tsx";
import {
  projectStatusIcon,
  projectStatusTone,
} from "@/app/modules/User/Projects/constants/projectStatus.ts";
import type { Project } from "@/app/modules/User/Projects/types/project.types.ts";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useTranslation();
  const StatusIcon = projectStatusIcon[project.status];
  const SourceIcon = project.sourceCodeOpen ? GitBranch : Lock;
  const visibleTags = (project.tags ?? []).slice(0, 3);
  const hiddenTagsCount = (project.tags?.length ?? 0) - visibleTags.length;

  return (
    <Link
      to={`/projects/${project.id}`}
      className="group flex min-h-100 flex-col overflow-hidden rounded-tile border border-border bg-surface transition-[border-color,background-color] duration-200 hover:border-ring hover:bg-surface-raised"
    >
      <div className="relative h-40 overflow-hidden border-b border-border bg-surface-inset">
        <img
          src={project.image}
          className="size-full object-cover grayscale transition-[filter,transform] duration-300 group-hover:scale-[1.03] group-hover:grayscale-0"
          alt={project.title}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge tone={projectStatusTone[project.status]}>
            {t(`pages.user.projects.statuses.${project.status}`)}
          </StatusBadge>
        </div>

        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-black leading-tight text-foreground">
            {project.title}
          </h2>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-control border border-border bg-surface-inset text-primary">
            <StatusIcon className="size-5" />
          </span>
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="rounded-control border border-border bg-surface-inset px-2.5 py-1 text-xs font-bold text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {hiddenTagsCount > 0 && (
            <span className="rounded-control border border-border bg-surface-inset px-2.5 py-1 text-xs font-bold text-muted-foreground">
              +{hiddenTagsCount}
            </span>
          )}
        </div>

        <div className="mt-auto grid grid-cols-[1fr_auto] items-center gap-3 border-t border-border pt-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border bg-surface-inset px-2.5 py-2 text-xs font-bold text-muted-foreground">
            <SourceIcon className="size-3.5" />
            {project.sourceCodeOpen
              ? t("pages.user.projects.sourceCode.stateOpen")
              : t("pages.user.projects.sourceCode.stateClosed")}
          </span>
          <span className="inline-flex items-center gap-2 rounded-control border border-border bg-surface-inset px-3 py-2 text-sm font-black text-muted-foreground transition-colors duration-200 group-hover:text-primary">
            <ExternalLink className="size-4" />
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
