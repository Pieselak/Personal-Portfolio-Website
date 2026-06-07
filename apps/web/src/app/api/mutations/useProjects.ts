import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "@/app/api/client.ts";
import type {
  CreateProjectBody,
  UpdateProjectBody,
} from "@/app/api/generated-api.ts";
import { projectQueryKeys } from "@/app/api/queries/useProjects.ts";

export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateProjectBody) => {
      const response =
        await ApiClient.projects.projectsControllerCreateProject(payload);
      return response.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.lists() });
    },
  });
};

export const useUpdateProjectMutation = (projectUuid: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateProjectBody) => {
      const response =
        await ApiClient.projects.projectsControllerUpdateProject(
          projectUuid,
          payload,
        );
      return response.data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: projectQueryKeys.detail(projectUuid),
      });
    },
  });
};

export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectUuid: string) => {
      const response =
        await ApiClient.projects.projectsControllerDeleteProject(projectUuid);
      return response.data;
    },
    onSuccess(_, projectUuid) {
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.lists() });
      queryClient.removeQueries({
        queryKey: projectQueryKeys.detail(projectUuid),
      });
    },
  });
};
