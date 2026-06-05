export const PERMISSIONS = [
  'status.maintenance:update',
  'projects:create',
  'projects:update',
  'projects:delete',
  'glucose.settings:read',
  'glucose.settings:update',
  'glucose.auth:read',
  'glucose.auth:authorize',
  'users:read',
  'users.roles:update',
  'roles:manage',
] as const;

export type PermissionCode = (typeof PERMISSIONS)[number];

export const DEFAULT_USER_ROLE = 'USER';
export const DEFAULT_ADMIN_ROLE = 'ADMIN';
