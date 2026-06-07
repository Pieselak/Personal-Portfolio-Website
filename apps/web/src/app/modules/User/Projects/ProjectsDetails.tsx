import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Reveal } from "@/app/components/motion/Reveal.tsx";
import { PageShell } from "@/app/components/ui/PageShell.tsx";
import { NotFoundPage } from "@/app/modules/Common/NotFound/NotFound.page.tsx";
import { ProjectBackLink } from "@/app/modules/User/Projects/components/ProjectBackLink.tsx";
import { ProjectContributorsPanel } from "@/app/modules/User/Projects/components/ProjectContributorsPanel.tsx";
import { ProjectDescriptionPanel } from "@/app/modules/User/Projects/components/ProjectDescriptionPanel.tsx";
import { ProjectHeroPanel } from "@/app/modules/User/Projects/components/ProjectHeroPanel.tsx";
import { ProjectMetaPanel } from "@/app/modules/User/Projects/components/ProjectMetaPanel.tsx";
import { ProjectPreviewImage } from "@/app/modules/User/Projects/components/ProjectPreviewImage.tsx";
import { useProject } from "@/app/api/queries/useProjects.ts";
import { ProjectsLoadingState } from "@/app/modules/User/Projects/components/ProjectsEmptyState.tsx";

export function MyProjectsDetailsPage() {
  const params = useParams();
  const { t } = useTranslation();
  const projectQuery = useProject(params.projectId);
  const project = projectQuery.data;

  if (projectQuery.isLoading) {
    return (
      <PageShell>
        <ProjectsLoadingState
          message={t("pages.user.projects.loadingProject")}
        />
      </PageShell>
    );
  }

  if (projectQuery.isError || !project) {
    return <NotFoundPage message={t("pages.user.projects.projectNotFound")} />;
  }

  return (
    <PageShell>
      <Reveal>
        <ProjectBackLink label={t("pages.user.projects.returnToProjects")} />
      </Reveal>

      <Reveal>
        <ProjectHeroPanel
          project={project}
          eyebrow={t("pages.user.projects.details.project")}
          statusLabel={t(`pages.user.projects.statuses.${project.status}`)}
        />
      </Reveal>

      <Reveal>
        <section className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <ProjectDescriptionPanel
            eyebrow={t("pages.user.projects.details.description")}
            title={t("pages.user.projects.details.whatItDoes")}
            description={project.description}
          />

          <div className="grid gap-4">
            <ProjectPreviewImage project={project} />

            <ProjectMetaPanel
              project={project}
              eyebrow={t("pages.user.projects.details.meta")}
              title={t("pages.user.projects.details.timeline")}
              startedAtLabel={t("pages.user.projects.startedAt")}
              completedAtLabel={t("pages.user.projects.completedAt")}
              sourceOpenLabel={t("pages.user.projects.sourceCode.openAction")}
              sourceClosedLabel={t(
                "pages.user.projects.sourceCode.stateClosed",
              )}
              sourceUnavailableLabel={t(
                "pages.user.projects.sourceCode.notAvailable",
              )}
            />

            <ProjectContributorsPanel
              eyebrow={t("pages.user.projects.details.team")}
              title={t("pages.user.projects.details.contributors")}
              emptyMessage={t("pages.user.projects.details.noContributors")}
              developers={project.developers}
            />
          </div>
        </section>
      </Reveal>
    </PageShell>
  );
}
