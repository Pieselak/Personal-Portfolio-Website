export const TERMS_OF_SERVICE_SECTIONS = [
  "general",
  "rules",
  "intellectualProperty",
  "liability",
  "complaints",
  "finalProvisions",
] as const;

export type TermsOfServiceSection = (typeof TERMS_OF_SERVICE_SECTIONS)[number];
