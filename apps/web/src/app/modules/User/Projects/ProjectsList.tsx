import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ExternalLink, LinkIcon } from "lucide-react";
import {
  type Project,
  projects,
} from "@/app/modules/User/Projects/Projects.enums.ts";
import { UserHeader } from "@/app/layouts/User/Header/UserHeader.tsx";

export function MyProjectsListPage() {
  const { t } = useTranslation();

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  const statusStyles = {
    completed:
      "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400",
    inProgress:
      "bg-orange-500/10 border-orange-500/30 text-orange-600 dark:text-orange-400",
    planned:
      "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400",
  };

  return (
    <>
      <UserHeader
        title={t("pages.user.projects.title")}
        subtitle={t("pages.user.projects.subtitle")}
      />
      <div className="space-y-6 w-full md:w-auto min-w-0 md:min-w-xl">
        {/* Projects Grid */}
        {projects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            transition={{ staggerChildren: 0.1 }}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project: Project, index) => (
              <motion.div
                key={project.id}
                custom={index}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                }}
                className="h-full"
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="flex flex-col h-full bg-card border border-border rounded-2xl overflow-hidden hover:border-ring shadow-sm hover:shadow-lg group"
                >
                  {/* Image Section */}
                  <div className="relative overflow-hidden h-48 bg-muted">
                    <img
                      src={project.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      alt={project.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[project.status]}`}
                      >
                        {t(`pages.user.projects.statuses.${project.status}`)}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col flex-1 gap-3 p-5">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-primary line-clamp-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags &&
                        project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-accent/10 border border-accent/30 text-accent"
                          >
                            {tag}
                          </span>
                        ))}
                      {project.tags && project.tags.length > 3 && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-muted border border-border text-muted-foreground">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 mt-auto border-t border-border/50">
                      <div className="flex gap-2">
                        {project.sourceCodeOpen && project.sourceCodeUrl && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(project.sourceCodeUrl, "_blank");
                            }}
                            className="flex items-center gap-1 px-2 py-1 rounded text-xs text-muted-foreground hover:text-accent hover:bg-muted transition-colors"
                            aria-label="Kod źródłowy"
                          >
                            <LinkIcon size={14} />
                          </button>
                        )}
                      </div>
                      <ExternalLink
                        size={14}
                        className="text-muted-foreground group-hover:text-accent transition-colors"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="bg-card border-2 border-dashed border-border rounded-2xl p-12 text-center text-muted-foreground">
            {t("pages.user.projects.noProjects")}
          </p>
        )}
      </div>
    </>
  );
}
