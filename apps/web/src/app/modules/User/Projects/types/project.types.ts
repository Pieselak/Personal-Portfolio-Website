export type ProjectStatus = "completed" | "inProgress" | "planned";

export type ProjectDeveloper = {
  name: string;
  role: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  status: ProjectStatus;
  sourceCodeOpen: boolean;
  sourceCodeUrl?: string;
  tags?: string[];
  startDate?: string;
  completeDate?: string;
  developers?: ProjectDeveloper[];
};

export type ProjectFilter = "all" | ProjectStatus;
