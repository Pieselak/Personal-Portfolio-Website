import { useAuthStore } from "@/app/modules/Auth/authStore.ts";

const EMPTY_PERMISSIONS: string[] = [];

export const ADMIN_PERMISSIONS = [
  "game.content:read",
  "projects:read",
  "announcements:read",
  "game.settings:read",
  "glucose.settings:read",
  "status.maintenance:update",
  "users:read",
  "roles:read",
] as const;

export function usePermissions() {
  const permissions =
    useAuthStore((state) => state.user?.role.permissions) ?? EMPTY_PERMISSIONS;
  const permissionSet = new Set(permissions);

  return {
    permissions,
    has: (permission: string) => permissionSet.has(permission),
    hasAny: (required: readonly string[]) =>
      required.some((permission) => permissionSet.has(permission)),
    hasAll: (required: readonly string[]) =>
      required.every((permission) => permissionSet.has(permission)),
  };
}
