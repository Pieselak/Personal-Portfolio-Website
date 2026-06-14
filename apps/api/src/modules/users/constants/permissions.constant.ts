export const PERMISSIONS: string[] = [
  'status.maintenance:update',
  'projects:read',
  'projects:create',
  'projects:update',
  'projects:publish',
  'projects:delete',
  'announcements:read',
  'announcements:create',
  'announcements:update',
  'announcements:publish',
  'announcements:delete',
  'game.content:read',
  'game.content:create',
  'game.content:update',
  'game.content:publish',
  'game.content:delete',
  'game.settings:read',
  'game.settings:update',
  'glucose.settings:read',
  'glucose.settings:update',
  'glucose.auth:read',
  'glucose.auth:authorize',
  'users:read',
  'users:delete',
  'users.status:update',
  'users.roles:update',
  'roles:read',
  'roles:create',
  'roles:update',
  'roles:delete',
] as const;

export const ROLES: Array<{
  code: string;
  label: string;
  permissions: string[];
}> = [
  { code: 'USER', label: 'user', permissions: [] },
  { code: 'CONTRIBUTOR', label: 'contributor', permissions: [] },
  { code: 'ADMIN', label: 'administrator', permissions: PERMISSIONS },
];
export const DEFAULT_ROLE_CODE: string = ROLES[0].code;
