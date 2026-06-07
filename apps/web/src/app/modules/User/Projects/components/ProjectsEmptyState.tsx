import { AlertCircle, FolderOpen, LoaderCircle } from "lucide-react";

type ProjectsEmptyStateProps = {
  message: string;
};

export function ProjectsEmptyState({ message }: ProjectsEmptyStateProps) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-tile border border-border bg-surface-inset p-6 text-center font-bold text-muted-foreground">
      <FolderOpen className="mr-2 size-5 shrink-0" />
      {message}
    </div>
  );
}

export function ProjectsLoadingState({ message }: ProjectsEmptyStateProps) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-tile border border-border bg-surface-inset p-6 font-bold text-muted-foreground">
      <LoaderCircle className="mr-2 size-5 animate-spin" />
      {message}
    </div>
  );
}

export function ProjectsErrorState({ message }: ProjectsEmptyStateProps) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-tile border border-red-border bg-red-bg p-6 text-center font-bold text-red-text">
      <AlertCircle className="mr-2 size-5 shrink-0" />
      {message}
    </div>
  );
}
