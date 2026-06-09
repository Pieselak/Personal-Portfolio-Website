import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/app/components/motion/Reveal.tsx";
import { PageShell } from "@/app/components/ui/PageShell.tsx";
import { UserHeader } from "@/app/layouts/User/Header/UserHeader.tsx";
import { ProjectFilterControl } from "@/app/modules/User/Projects/components/ProjectFilterControl.tsx";
import {
  ProjectsErrorState,
  ProjectsEmptyState,
  ProjectsLoadingState,
} from "@/app/modules/User/Projects/components/ProjectsEmptyState.tsx";
import { ProjectsGrid } from "@/app/modules/User/Projects/components/ProjectsGrid.tsx";
import type { ProjectFilter } from "@/app/modules/User/Projects/types/project.types.ts";
import { useProjectList } from "@/app/api/queries/useProjects.ts";

export function MyProjectsListPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<ProjectFilter>("ALL");
  const projectsQuery = useProjectList();

  const visibleProjects = useMemo(() => {
    const projects = projectsQuery.data ?? [];

    if (filter === "ALL") {
      return projects;
    }

    return projects.filter((project) => project.status.code === filter);
  }, [filter, projectsQuery.data]);

  return (
    <PageShell>
      <UserHeader
        title={t("pages.user.projects.title")}
        subtitle={t("pages.user.projects.subtitle")}
      />

      <ProjectFilterControl value={filter} onChange={setFilter} />

      <Reveal key={filter}>
        {projectsQuery.isLoading ? (
          <ProjectsLoadingState message={t("pages.user.projects.loading")} />
        ) : projectsQuery.isError ? (
          <ProjectsErrorState message={t("pages.user.projects.loadError")} />
        ) : visibleProjects.length > 0 ? (
          <ProjectsGrid projects={visibleProjects} />
        ) : (
          <ProjectsEmptyState message={t("pages.user.projects.noProjects")} />
        )}
      </Reveal>
    </PageShell>
  );
}
