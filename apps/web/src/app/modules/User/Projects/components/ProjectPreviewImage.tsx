import type { Project } from "@/app/modules/User/Projects/types/project.types.ts";

type ProjectPreviewImageProps = {
  project: Project;
};

export function ProjectPreviewImage({ project }: ProjectPreviewImageProps) {
  return (
    <div className="overflow-hidden rounded-tile border border-border bg-surface-inset">
      {project.imageUrl ? (
        <img
          src={project.imageUrl}
          className="h-64 w-full object-cover grayscale md:h-80"
          alt={project.title}
        />
      ) : (
        <div className="flex h-64 w-full items-center justify-center p-6 text-center font-black text-muted-foreground md:h-80">
          {project.title}
        </div>
      )}
    </div>
  );
}
