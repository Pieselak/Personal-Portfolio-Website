import { FileText } from "lucide-react";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";

type LegalDocumentSectionPanelProps = {
  eyebrow?: string;
  title: string;
  content: string;
};

export function LegalDocumentSectionPanel({
  eyebrow,
  title,
  content,
}: LegalDocumentSectionPanelProps) {
  return (
    <BentoTile
      eyebrow={eyebrow}
      title={title}
      action={
        <span className="flex size-10 items-center justify-center rounded-control border border-border bg-surface-inset text-primary">
          <FileText className="size-5" />
        </span>
      }
    >
      <p className="whitespace-pre-wrap text-sm leading-7 text-muted-foreground md:text-base">
        {content}
      </p>
    </BentoTile>
  );
}
