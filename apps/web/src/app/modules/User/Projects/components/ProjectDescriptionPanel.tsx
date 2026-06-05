import { BentoTile } from "@/app/components/ui/BentoTile.tsx";

type ProjectDescriptionPanelProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function ProjectDescriptionPanel({
  eyebrow,
  title,
  description,
}: ProjectDescriptionPanelProps) {
  return (
    <BentoTile eyebrow={eyebrow} title={title}>
      <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
        {description}
      </p>
    </BentoTile>
  );
}
