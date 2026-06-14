export const apiQueryKeys = {
  serviceStatus: ["service", "status"] as const,
  activeAnnouncement: (language: string) =>
    ["announcement", "active", language] as const,
  publicBosses: (language: string) => ["game", "bosses", language] as const,
  admin: {
    projects: ["admin", "projects"] as const,
    announcements: ["admin", "announcements"] as const,
    bosses: ["admin", "game", "bosses"] as const,
    questions: ["admin", "game", "questions"] as const,
    gameSettings: ["admin", "settings", "game"] as const,
    gameStats: ["admin", "game", "stats"] as const,
    glucoseProviders: ["admin", "settings", "glucose", "providers"] as const,
    users: ["admin", "users"] as const,
    roles: ["admin", "roles"] as const,
    permissions: ["admin", "permissions"] as const,
  },
};
