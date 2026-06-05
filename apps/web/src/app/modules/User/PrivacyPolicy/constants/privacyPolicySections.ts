export const PRIVACY_POLICY_SECTIONS = [
  "controller",
  "dataCollection",
  "dataSharing",
  "retention",
  "userRights",
  "cookies",
  "security",
] as const;

export type PrivacyPolicySection = (typeof PRIVACY_POLICY_SECTIONS)[number];
