import type { Project } from "@/app/modules/User/Projects/types/project.types.ts";

type ProjectPreviewImageProps = {
  project: Project;
};

export function ProjectPreviewImage({ project }: ProjectPreviewImageProps) {
  return (
    <div className="overflow-hidden rounded-tile border border-border bg-surface-inset">
      <img
        src={project.image}
        className="h-64 w-full object-cover grayscale md:h-80"
        alt={project.title}
      />
    </div>
  );
}
