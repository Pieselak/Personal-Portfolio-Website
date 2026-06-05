import { BentoTile } from "@/app/components/ui/BentoTile.tsx";

type LanguageEmptyStateProps = {
  message: string;
};

export function LanguageEmptyState({ message }: LanguageEmptyStateProps) {
  return (
    <BentoTile className="border-dashed text-center">
      <p className="font-bold text-muted-foreground">{message}</p>
    </BentoTile>
  );
}
