import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/app/api/client.ts";
import { mapProjectFromApi } from "@/app/modules/User/Projects/utils/projectApiAdapter.ts";

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
    queryFn: async () => {
      const response = await ApiClient.projects.projectsControllerGetProjects();
      return response.data;
    },
    select: (projects) => projects.map(mapProjectFromApi),
  });
};

export const useProject = (projectUuid?: string) => {
  return useQuery({
    queryKey: projectQueryKeys.detail(projectUuid ?? ""),
    queryFn: async () => {
      const response =
        await ApiClient.projects.projectsControllerGetProjectById(
          projectUuid ?? "",
        );
      return response.data;
    },
    select: mapProjectFromApi,
    enabled: Boolean(projectUuid),
  });
};
