import { BentoTile } from "@/app/components/ui/BentoTile.tsx";

type ProjectsEmptyStateProps = {
  message: string;
};

export function ProjectsEmptyState({ message }: ProjectsEmptyStateProps) {
  return (
    <BentoTile className="border-dashed text-center">
      <p className="font-bold text-muted-foreground">{message}</p>
    </BentoTile>
  );
}
