import { ProjectCard } from "@/app/modules/User/Projects/components/ProjectCard.tsx";
import type { Project } from "@/app/modules/User/Projects/types/project.types.ts";

type ProjectsGridProps = {
  projects: Project[];
};

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.uuid} project={project} />
      ))}
    </section>
  );
}
