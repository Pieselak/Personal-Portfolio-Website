import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/app/api/client.ts";

export const projectQueryKeys = {
  all: ["projects"] as const,
  lists: () => [...projectQueryKeys.all, "list"] as const,
  list: () => [...projectQueryKeys.lists()] as const,
  details: () => [...projectQueryKeys.all, "detail"] as const,
  detail: (projectUuid: string) =>
    [...projectQueryKeys.details(), projectUuid] as const,
};

export const useProjectList = () => {
  return useQuery({
    queryKey: projectQueryKeys.list(),
    queryFn: () => ApiClient.projects.projectsControllerGetProjects(),
    select: (response) => response.data,
  });
};

export const useProject = (projectUuid?: string) => {
  return useQuery({
    queryKey: projectQueryKeys.detail(projectUuid ?? ""),
    queryFn: () =>
      ApiClient.projects.projectsControllerGetProjectById(projectUuid ?? ""),
    select: (response) => response.data,
    enabled: Boolean(projectUuid),
  });
};
