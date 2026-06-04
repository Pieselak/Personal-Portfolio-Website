import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Calendar, ExternalLink, Lock, Users } from "lucide-react";
import { motion } from "framer-motion";
import { NotFoundPage } from "@/app/modules/Common/NotFound/NotFound.page.tsx";
import {
  type Project,
  projects,
} from "@/app/modules/User/Projects/Projects.enums.ts";
import { Badge, Card, SectionHeader } from "@/app/components/ui.tsx";

const statusTone = {
  completed: "success",
  inProgress: "warning",
  planned: "neutral",
} as const;

export function MyProjectsDetailsPage() {
  const params = useParams();
  const { t } = useTranslation();

  const projectId = params.projectId ? parseInt(params.projectId) : null;
  const project = projects.find((p: Project) => p.id === projectId);
  if (!project) {
    return <NotFoundPage message={t("pages.user.projects.projectNotFound")} />;
  }

  return (
    <motion.div
      className="w-full space-y-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        {t("pages.user.projects.returnToProjects")}
      </Link>

      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <SectionHeader
            eyebrow={t("pages.user.projects.caseStudy")}
            title={project.title}
          />

          <div className="relative h-[22rem] overflow-hidden rounded-lg border border-border bg-secondary shadow-md">
            <img
              src={project.image}
              className="h-full w-full object-cover grayscale-[18%]"
              alt={project.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/12 to-transparent" />
          </div>

          <Card className="p-6 md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
              {t("pages.user.projects.overview")}
            </p>
            <p className="mt-4 whitespace-pre-wrap text-base leading-8 text-muted-foreground">
              {project.description}
            </p>
          </Card>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          <Card className="p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                {t("pages.user.projects.statusLabel")}
              </p>
              <Badge tone={statusTone[project.status]}>
                {t(`pages.user.projects.statuses.${project.status}`)}
              </Badge>
            </div>
          </Card>

          {project.tags && (
            <Card className="p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                {t("pages.user.projects.technologies")}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </Card>
          )}

          <Card className="p-5">
            <div className="space-y-4">
              {project.startDate && (
                <div className="flex gap-3">
                  <Calendar className="mt-1 size-4 text-accent" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      {t("pages.user.projects.started")}
                    </p>
                    <p className="font-semibold text-foreground">
                      {project.startDate}
                    </p>
                  </div>
                </div>
              )}

              {project.developers && (
                <div className="flex gap-3">
                  <Users className="mt-1 size-4 text-accent" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      {t("pages.user.projects.team")}
                    </p>
                    <div className="mt-2 space-y-2">
                      {project.developers.map((dev) => (
                        <div key={dev.name}>
                          <p className="font-semibold text-foreground">
                            {dev.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {dev.role}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {project.sourceCodeOpen && project.sourceCodeUrl ? (
            <a
              href={project.sourceCodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center gap-2 rounded-md border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <ExternalLink className="size-4" />
              {t("pages.user.projects.sourceCode.available")}
            </a>
          ) : (
            <Card className="flex items-center gap-3 p-4 text-sm font-semibold text-muted-foreground">
              <Lock className="size-4" />
              {project.sourceCodeOpen
                ? t("pages.user.projects.sourceCode.notAvailable")
                : t("pages.user.projects.sourceCode.closed")}
            </Card>
          )}
        </aside>
      </section>
    </motion.div>
  );
}
