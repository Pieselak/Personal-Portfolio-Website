export const PERMISSIONS: string[] = [
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
