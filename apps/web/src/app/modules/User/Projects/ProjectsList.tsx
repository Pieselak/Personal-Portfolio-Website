import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, LinkIcon } from "lucide-react";
import {
  type Project,
  projects,
} from "@/app/modules/User/Projects/Projects.enums.ts";
import { Badge, Card, SectionHeader, StatePanel } from "@/app/components/ui.tsx";

const statusTone = {
  completed: "success",
  inProgress: "warning",
  planned: "neutral",
} as const;

export function MyProjectsListPage() {
  const { t } = useTranslation();

  return (
    <motion.div
      className="w-full space-y-8"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <SectionHeader
        eyebrow={t("pages.user.projects.eyebrow")}
        title={t("pages.user.projects.title")}
        description={t("pages.user.projects.subtitle")}
      />

      {projects.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project: Project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={`/projects/${project.id}`} className="group block h-full">
                <Card className="flex h-full flex-col overflow-hidden transition-[border-color,transform] duration-200 group-hover:-translate-y-1 group-hover:border-ring">
                  <div className="relative h-52 overflow-hidden border-b border-border bg-secondary">
                    <img
                      src={project.image}
                      className="h-full w-full object-cover grayscale-[20%] transition-transform duration-500 group-hover:scale-[1.03]"
                      alt={project.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/12 to-transparent" />
                    <div className="absolute left-4 top-4">
                      <Badge tone={statusTone[project.status]}>
                        {t(`pages.user.projects.statuses.${project.status}`)}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-2xl font-semibold leading-tight text-foreground">
                      {project.title}
                    </p>
                    <p className="mt-3 line-clamp-4 flex-1 text-sm leading-6 text-muted-foreground">
                      {project.description}
                    </p>

                    {project.tags && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.tags.slice(0, 4).map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
                        {t("pages.user.projects.viewCaseStudy")}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      {project.sourceCodeOpen && project.sourceCodeUrl ? (
                        <ExternalLink className="size-4 text-muted-foreground" />
                      ) : (
                        <LinkIcon className="size-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.article>
          ))}
        </div>
      ) : (
        <StatePanel message={t("pages.user.projects.noProjects")} />
      )}
    </motion.div>
  );
}
