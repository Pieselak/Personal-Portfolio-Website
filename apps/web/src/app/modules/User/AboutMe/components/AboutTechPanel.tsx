import { Code2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";

const technologies = [
  "React",
  "NestJS",
  "TailwindCSS",
  "PostgreSQL",
  "Redis",
  "OpenAPI",
];

export function AboutTechPanel() {
  const { t } = useTranslation();

  return (
    <BentoTile
      eyebrow={t("pages.user.aboutme.tech.eyebrow")}
      title={t("pages.user.aboutme.tech.title")}
      description={t("pages.user.aboutme.tech.description")}
      className="h-full"
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {technologies.map((technology) => (
          <div
            key={technology}
            className="flex min-h-24 flex-col justify-between rounded-tile border border-border bg-surface-inset p-4"
          >
            <Code2 className="size-5 text-primary" />
            <p className="text-lg font-black text-foreground">{technology}</p>
          </div>
        ))}
      </div>
    </BentoTile>
  );
}
