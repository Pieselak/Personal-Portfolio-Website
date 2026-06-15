import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/app/api/client.ts";

type ProjectsQuery = NonNullable<
  Parameters<typeof ApiClient.projects.projectsControllerGetProjects>[0]
>;
type ProjectLanguage = NonNullable<ProjectsQuery["lang"]>;

function normalizeProjectLanguage(language: string): ProjectLanguage {
  return language === "en" || language === "de" ? language : "pl";
}

export const projectQueryKeys = {
  all: ["projects"] as const,
  lists: () => [...projectQueryKeys.all, "list"] as const,
  list: (language: ProjectLanguage) =>
    [...projectQueryKeys.lists(), language] as const,
  details: () => [...projectQueryKeys.all, "detail"] as const,
  detailRoot: (projectUuid: string) =>
    [...projectQueryKeys.details(), projectUuid] as const,
  detail: (projectUuid: string, language: ProjectLanguage) =>
    [...projectQueryKeys.detailRoot(projectUuid), language] as const,
};

export const useProjectList = (language: string) => {
  const normalizedLanguage = normalizeProjectLanguage(language);

  return useQuery({
    queryKey: projectQueryKeys.list(normalizedLanguage),
    queryFn: () =>
      ApiClient.projects.projectsControllerGetProjects({
        lang: normalizedLanguage,
      }),
    select: (response) => response.data,
  });
};

export const useProject = (projectUuid: string | undefined, language: string) => {
  const normalizedLanguage = normalizeProjectLanguage(language);

  return useQuery({
    queryKey: projectQueryKeys.detail(
      projectUuid ?? "",
      normalizedLanguage,
    ),
    queryFn: () =>
      ApiClient.projects.projectsControllerGetProjectById(projectUuid ?? "", {
        lang: normalizedLanguage,
      }),
    select: (response) => response.data,
    enabled: Boolean(projectUuid),
  });
};
