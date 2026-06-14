import { BentoTile } from "@/app/components/ui/BentoTile.tsx";
import { MarkdownContent } from "@/app/components/content/MarkdownContent.tsx";

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
      <MarkdownContent>{description}</MarkdownContent>
    </BentoTile>
  );
}
