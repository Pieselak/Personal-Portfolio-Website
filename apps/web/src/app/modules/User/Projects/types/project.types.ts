import type { GetProjectResponse } from "@/app/api/generated-api.ts";

export type ProjectStatus = "COMPLETED" | "IN_PROGRESS" | "PLANNED" | "ON_HOLD";

export type ProjectDeveloper = {
  name: string;
  role?: string;
  profileUrl?: string;
};

export type Project = GetProjectResponse;

export type ProjectFilter = "ALL" | ProjectStatus;
