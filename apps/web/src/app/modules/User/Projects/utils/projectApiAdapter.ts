import type { GetProjectResponse } from "@/app/api/generated-api.ts";
import type {
  Project,
  ProjectStatus,
} from "@/app/modules/User/Projects/types/project.types.ts";

const projectStatusMap: Record<string, ProjectStatus> = {
  COMPLETED: "completed",
  IN_PROGRESS: "inProgress",
  PLANNED: "planned",
  ON_HOLD: "onHold",
};

export function mapProjectFromApi(project: GetProjectResponse): Project {
  return {
    uuid: project.uuid,
    title: project.title,
    description: project.detailedDescription || project.shortDescription,
    image: project.imageUrl,
    status: projectStatusMap[project.status.code] ?? "planned",
    sourceCodeOpen: project.sourceCodeOpen,
    sourceCodeUrl: project.sourceCodeUrl,
    tags: project.tags.map((tag) => tag.name),
    startDate: project.startDate,
    completeDate: project.completeDate,
    developers: project.developers,
  };
}
