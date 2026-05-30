import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ExternalLink,
  Lock,
  Users,
  Calendar,
  LinkIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { NotFoundPage } from "@/app/modules/Common/NotFound/NotFound.page.tsx";
import {
  type Project,
  projects,
} from "@/app/modules/User/Projects/Projects.enums.ts";

export function MyProjectsDetailsPage() {
  const params = useParams();
  const { t } = useTranslation();

  const projectId = params.projectId ? parseInt(params.projectId) : null;
  const project = projects.find((p: Project) => p.id === projectId);
  if (!project) {
    return <NotFoundPage message={t("user.myProjectsPage.projectNotFound")} />;
  }

  const statusStyles = {
    completed:
      "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400",
    inProgress:
      "bg-orange-500/10 border-orange-500/30 text-orange-600 dark:text-orange-400",
    planned:
      "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400",
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="space-y-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft size={18} />
            <span>{t("user.myProjectsPage.returnToProjects")}</span>
          </Link>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Image and Metadata */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="space-y-4 sticky top-6">
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-2xl bg-muted border border-border shadow-lg h-64 lg:h-80">
                <img
                  src={project.image}
                  className="w-full h-full object-cover"
                  alt={project.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
              </div>

              {/* Status Badge */}
              <div className="flex justify-center">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold border ${statusStyles[project.status]}`}
                >
                  {t(`user.myProjectsPage.status.${project.status}`)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {project.sourceCodeOpen ? (
                  project.sourceCodeUrl ? (
                    <motion.a
                      href={project.sourceCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex w-full items-center justify-center gap-2 px-4 py-3 bg-accent/20 border border-accent rounded-xl text-accent hover:bg-accent/30 font-medium transition-colors"
                    >
                      <LinkIcon size={18} />
                      {t("user.myProjectsPage.sourceCodeAvailable")}
                    </motion.a>
                  ) : (
                    <div className="flex w-full items-center justify-center gap-2 px-4 py-3 bg-muted border border-border rounded-xl text-muted-foreground font-medium">
                      <ExternalLink size={18} />
                      {t("user.myProjectsPage.sourceCodeNotAvailable")}
                    </div>
                  )
                ) : (
                  <div className="flex w-full items-center justify-center gap-2 px-4 py-3 bg-muted border border-border rounded-xl text-muted-foreground font-medium">
                    <Lock size={18} />
                    {t("user.myProjectsPage.sourceCodeClosed")}
                  </div>
                )}
              </div>

              {/* Metadata Cards */}
              {project.startDate && (
                <div className="bg-card border border-border rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar size={16} />
                    <span className="font-medium uppercase tracking-wide">
                      {t("user.myProjectsPage.started")}
                    </span>
                  </div>
                  <p className="text-primary font-semibold">
                    {project.startDate}
                  </p>
                </div>
              )}

              {project.completeDate && (
                <div className="bg-card border border-border rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar size={16} />
                    <span className="font-medium uppercase tracking-wide">
                      {t("user.myProjectsPage.completed")}
                    </span>
                  </div>
                  <p className="text-primary font-semibold">
                    {project.completeDate}
                  </p>
                </div>
              )}

              {/* Developers */}
              {project.developers && project.developers.length > 0 && (
                <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users size={16} />
                    <span className="font-medium uppercase tracking-wide text-sm">
                      Zespół
                    </span>
                  </div>
                  <div className="space-y-2">
                    {project.developers.map((dev) => (
                      <div
                        key={dev.name}
                        className="pb-2 last:pb-0 last:border-0 border-b border-border/50"
                      >
                        <p className="text-sm font-semibold text-primary">
                          {dev.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {dev.role}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right: Description and Tags */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-primary">
                  {project.title}
                </h1>
              </div>

              {/* Tags */}
              {project.tags && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-accent/10 border border-accent/30 text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                <div className="prose prose-invert max-w-none dark:prose-invert">
                  <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    Status
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    {t(`user.myProjectsPage.status.${project.status}`)}
                  </p>
                </div>
                {project.tags && (
                  <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                      Technologie
                    </p>
                    <p className="text-sm font-semibold text-primary">
                      {project.tags.length}
                    </p>
                  </div>
                )}
                {project.developers && (
                  <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                      Zespół
                    </p>
                    <p className="text-sm font-semibold text-primary">
                      {project.developers.length}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
