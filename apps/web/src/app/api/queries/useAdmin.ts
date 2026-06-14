import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/app/api/client.ts";
import type { UserResponse } from "@/app/api/generated-api.ts";
import { apiQueryKeys } from "@/app/api/queryKeys.ts";
import type {
  AdminProject,
  Announcement,
  GameBoss,
  GameQuestion,
  Role,
} from "@/app/api/admin.types.ts";

export function useAdminProjects() {
  return useQuery({
    queryKey: apiQueryKeys.admin.projects,
    queryFn: async () =>
      (await ApiClient.admin.adminProjectsControllerFindAll())
        .data as AdminProject[],
  });
}

export function useAnnouncements() {
  return useQuery({
    queryKey: apiQueryKeys.admin.announcements,
    queryFn: async () =>
      (await ApiClient.announcements.announcementsControllerFindAll())
        .data as Announcement[],
  });
}

export function useAdminBosses() {
  return useQuery({
    queryKey: apiQueryKeys.admin.bosses,
    queryFn: async () =>
      (await ApiClient.game.gameControllerGetAdminBosses()).data as GameBoss[],
  });
}

export function useAdminQuestions() {
  return useQuery({
    queryKey: apiQueryKeys.admin.questions,
    queryFn: async () =>
      (await ApiClient.game.gameControllerGetAdminQuestions())
        .data as GameQuestion[],
  });
}

export function useGameSettings(enabled = true) {
  return useQuery({
    queryKey: apiQueryKeys.admin.gameSettings,
    queryFn: async () =>
      (await ApiClient.settings.settingsControllerGetGameSettings()).data,
    enabled,
  });
}

export function useGameStats(enabled = true) {
  return useQuery({
    queryKey: apiQueryKeys.admin.gameStats,
    queryFn: async () =>
      (await ApiClient.game.gameControllerGetAdminStats()).data,
    refetchInterval: 10_000,
    refetchIntervalInBackground: true,
    staleTime: 5_000,
    enabled,
  });
}

export function useAdminUsers() {
  return useQuery({
    queryKey: apiQueryKeys.admin.users,
    queryFn: async () =>
      (await ApiClient.users.usersControllerGetUsers()).data as UserResponse[],
  });
}

export function useRoles() {
  return useQuery({
    queryKey: apiQueryKeys.admin.roles,
    queryFn: async () =>
      (await ApiClient.roles.rolesControllerGetRoles()).data as Role[],
  });
}

export function usePermissionCatalog() {
  return useQuery({
    queryKey: apiQueryKeys.admin.permissions,
    queryFn: async () =>
      (await ApiClient.roles.rolesControllerGetPermissions()).data as string[],
  });
}

export function useGlucoseProviderModes(enabled = true) {
  return useQuery({
    queryKey: apiQueryKeys.admin.glucoseProviders,
    queryFn: async () =>
      (
        await ApiClient.glucose.glucoseSettingsControllerGetProviderModes()
      ).data,
    enabled,
  });
}
