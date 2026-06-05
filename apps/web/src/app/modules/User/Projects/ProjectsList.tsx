import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Reveal } from "@/app/components/motion/Reveal.tsx";
import { PageShell } from "@/app/components/ui/PageShell.tsx";
import { UserHeader } from "@/app/layouts/User/Header/UserHeader.tsx";
import { ProjectFilterControl } from "@/app/modules/User/Projects/components/ProjectFilterControl.tsx";
import { ProjectsEmptyState } from "@/app/modules/User/Projects/components/ProjectsEmptyState.tsx";
import { ProjectsGrid } from "@/app/modules/User/Projects/components/ProjectsGrid.tsx";
import { projects } from "@/app/modules/User/Projects/data/projects.ts";
import type { ProjectFilter } from "@/app/modules/User/Projects/types/project.types.ts";

export function MyProjectsListPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<ProjectFilter>("all");

  const visibleProjects = useMemo(() => {
    if (filter === "all") {
      return projects;
    }

    return projects.filter((project) => project.status === filter);
  }, [filter]);

  return (
    <PageShell>
      <UserHeader
        title={t("pages.user.projects.title")}
        subtitle={t("pages.user.projects.subtitle")}
      />

      <ProjectFilterControl value={filter} onChange={setFilter} />

      <Reveal key={filter}>
        {visibleProjects.length > 0 ? (
          <ProjectsGrid projects={visibleProjects} />
        ) : (
          <ProjectsEmptyState message={t("pages.user.projects.noProjects")} />
        )}
      </Reveal>
    </PageShell>
  );
}
