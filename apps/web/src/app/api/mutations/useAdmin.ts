import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "@/app/api/client.ts";
import type {
  CreateAnnouncementBody,
  CreateBossBody,
  CreateProjectBody,
  CreateQuestionBody,
  CreateRoleBody,
  BlockUserBody,
  DeleteRoleBody,
  GameSettingsResponse,
  GetProviderModesResponse,
  ImportGameContentBody,
  StatusCheckResponse,
  SetProviderModeBody,
  UpdateAnnouncementBody,
  UpdateBossBody,
  UpdateProjectBody,
  UpdateQuestionBody,
  UpdateRoleBody,
} from "@/app/api/generated-api.ts";
import { ServiceStatus } from "@/app/api/generated-api.ts";
import { apiQueryKeys } from "@/app/api/queryKeys.ts";

export function useAdminProjectMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (
      input:
        | { uuid: string; payload: UpdateProjectBody }
        | { uuid?: undefined; payload: CreateProjectBody },
    ) =>
      input.uuid
        ? ApiClient.admin.adminProjectsControllerUpdate(
            input.uuid,
            input.payload as UpdateProjectBody,
          )
        : ApiClient.admin.adminProjectsControllerCreate(
            input.payload as CreateProjectBody,
          ),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: apiQueryKeys.admin.projects }),
  });
}

export function useProjectAction() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({
      uuid,
      action,
    }: {
      uuid: string;
      action: "publish" | "unpublish" | "delete";
    }) => {
      if (action === "publish") {
        return ApiClient.admin.adminProjectsControllerPublish(uuid);
      }
      if (action === "unpublish") {
        return ApiClient.admin.adminProjectsControllerUnpublish(uuid);
      }
      return ApiClient.admin.adminProjectsControllerRemove(uuid);
    },
    onSuccess: () =>
      client.invalidateQueries({ queryKey: apiQueryKeys.admin.projects }),
  });
}

export function useAnnouncementMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (
      input:
        | { uuid: string; payload: UpdateAnnouncementBody }
        | { uuid?: undefined; payload: CreateAnnouncementBody },
    ) =>
      input.uuid
        ? ApiClient.announcements.announcementsControllerUpdate(
            input.uuid,
            input.payload as UpdateAnnouncementBody,
          )
        : ApiClient.announcements.announcementsControllerCreate(
            input.payload as CreateAnnouncementBody,
          ),
    onSuccess: () =>
      client.invalidateQueries({
        queryKey: apiQueryKeys.admin.announcements,
      }),
  });
}

export function useAnnouncementAction() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({
      uuid,
      action,
    }: {
      uuid: string;
      action: "publish" | "unpublish" | "delete";
    }) => {
      if (action === "publish") {
        return ApiClient.announcements.announcementsControllerPublish(uuid);
      }
      if (action === "unpublish") {
        return ApiClient.announcements.announcementsControllerUnpublish(uuid);
      }
      return ApiClient.announcements.announcementsControllerRemove(uuid);
    },
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: apiQueryKeys.admin.announcements,
      });
      client.invalidateQueries({
        queryKey: ["announcement", "active"],
      });
    },
  });
}

export function useBossMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (
      input:
        | { uuid: string; payload: UpdateBossBody }
        | { uuid?: undefined; payload: CreateBossBody },
    ) =>
      input.uuid
        ? ApiClient.game.gameControllerUpdateBoss(
            input.uuid,
            input.payload as UpdateBossBody,
          )
        : ApiClient.game.gameControllerCreateBoss(
            input.payload as CreateBossBody,
          ),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: apiQueryKeys.admin.bosses });
      client.invalidateQueries({ queryKey: ["game", "bosses"] });
    },
  });
}

export function useImportGameContentMutation() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (payload: ImportGameContentBody) =>
      ApiClient.game.gameControllerImportGameContent(payload),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: apiQueryKeys.admin.bosses });
      client.invalidateQueries({ queryKey: apiQueryKeys.admin.questions });
      client.invalidateQueries({ queryKey: ["game", "bosses"] });
    },
  });
}

export function useQuestionMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (
      input:
        | { uuid: string; payload: UpdateQuestionBody }
        | { uuid?: undefined; payload: CreateQuestionBody },
    ) =>
      input.uuid
        ? ApiClient.game.gameControllerUpdateQuestion(
            input.uuid,
            input.payload as UpdateQuestionBody,
          )
        : ApiClient.game.gameControllerCreateQuestion(
            input.payload as CreateQuestionBody,
          ),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: apiQueryKeys.admin.questions }),
  });
}

export function useDeleteGameContent() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({
      type,
      uuid,
    }: {
      type: "boss" | "question";
      uuid: string;
    }) =>
      type === "boss"
        ? ApiClient.game.gameControllerDeleteBoss(uuid)
        : ApiClient.game.gameControllerDeleteQuestion(uuid),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: apiQueryKeys.admin.bosses });
      client.invalidateQueries({ queryKey: apiQueryKeys.admin.questions });
      client.invalidateQueries({ queryKey: ["game", "bosses"] });
    },
  });
}

export function useGameSettingsMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (enabled: boolean) =>
      ApiClient.settings.settingsControllerUpdateGameSettings({ enabled }),
    onSuccess: ({ data }) => {
      client.setQueryData<GameSettingsResponse>(
        apiQueryKeys.admin.gameSettings,
        data,
      );
      client.invalidateQueries({ queryKey: apiQueryKeys.admin.gameSettings });
    },
  });
}

export function useUserAdminMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({
      uuid,
      roleCode,
      isActive,
    }: {
      uuid: string;
      roleCode?: string;
      isActive?: boolean;
    }) => {
      if (roleCode) {
        return ApiClient.users.usersControllerUpdateUserRole(uuid, {
          roleCode,
        });
      }
      return ApiClient.users.usersControllerUpdateUserStatus(uuid, {
        isActive: Boolean(isActive),
      });
    },
    onSuccess: () =>
      client.invalidateQueries({ queryKey: apiQueryKeys.admin.users }),
  });
}

export function useBlockUserMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ uuid, payload }: { uuid: string; payload: BlockUserBody }) =>
      ApiClient.users.usersControllerBlockUser(uuid, payload),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: apiQueryKeys.admin.users }),
  });
}

export function useUnblockUserMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (uuid: string) =>
      ApiClient.users.usersControllerUnblockUser(uuid),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: apiQueryKeys.admin.users }),
  });
}

export function useDeleteUserMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (uuid: string) =>
      ApiClient.users.usersControllerDeleteUser(uuid),
    onSuccess: () =>
      client.invalidateQueries({ queryKey: apiQueryKeys.admin.users }),
  });
}

export function useRoleMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async ({
      code,
      payload,
    }: {
      code?: string;
      payload: CreateRoleBody | UpdateRoleBody;
    }) =>
      code
        ? ApiClient.roles.rolesControllerUpdateRole(
            code,
            payload as UpdateRoleBody,
          )
        : ApiClient.roles.rolesControllerCreateRole(payload as CreateRoleBody),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: apiQueryKeys.admin.roles });
      client.invalidateQueries({ queryKey: apiQueryKeys.admin.users });
    },
  });
}

export function useDeleteRoleMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({
      code,
      payload,
    }: {
      code: string;
      payload: DeleteRoleBody;
    }) => ApiClient.roles.rolesControllerDeleteRole(code, payload),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: apiQueryKeys.admin.roles });
      client.invalidateQueries({ queryKey: apiQueryKeys.admin.users });
    },
  });
}

export function useGlucoseProviderMutation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (mode: SetProviderModeBody["provider"]) =>
      ApiClient.glucose.glucoseSettingsControllerSetProviderMode({
        provider: mode,
      }),
    onSuccess: ({ data }) => {
      client.setQueryData<GetProviderModesResponse>(
        apiQueryKeys.admin.glucoseProviders,
        (current) =>
          current
            ? {
                providers: current.providers.map((provider) => ({
                  ...provider,
                  selected: provider.name === data.provider,
                })),
              }
            : current,
      );
      client.invalidateQueries({
        queryKey: apiQueryKeys.admin.glucoseProviders,
      });
    },
  });
}

export function useMaintenanceMutation() {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (enable: boolean) =>
      ApiClient.status.statusControllerSetMaintenanceMode({ enable }),
    onSuccess: ({ data }) => {
      client.setQueryData<StatusCheckResponse>(
        apiQueryKeys.serviceStatus,
        (current) => ({
          status: data.enabled
            ? ServiceStatus.Maintenance
            : ServiceStatus.Operational,
          uptime: current?.uptime ?? 0,
          timestamp: Date.now(),
        }),
      );
      client.invalidateQueries({ queryKey: apiQueryKeys.serviceStatus });
    },
  });
}
