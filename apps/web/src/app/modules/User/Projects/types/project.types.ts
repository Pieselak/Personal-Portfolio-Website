export type ProjectStatus = "completed" | "inProgress" | "planned" | "onHold";

export type ProjectDeveloper = {
  name: string;
  role?: string;
  profileUrl?: string;
};

export type Project = {
  uuid: string;
  title: string;
  description: string;
  image?: string;
  status: ProjectStatus;
  sourceCodeOpen: boolean;
  sourceCodeUrl?: string;
  tags?: string[];
  startDate?: string;
  completeDate?: string;
  developers?: ProjectDeveloper[];
};

export type ProjectFilter = "all" | ProjectStatus;
