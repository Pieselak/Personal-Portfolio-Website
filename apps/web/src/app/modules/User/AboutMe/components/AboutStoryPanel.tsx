import { useTranslation } from "react-i18next";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";

const paragraphs = ["start", "learning", "goal"];

export function AboutStoryPanel() {
  const { t } = useTranslation();

  return (
    <BentoTile
      eyebrow={t("pages.user.aboutme.story.eyebrow")}
      title={t("pages.user.aboutme.story.title")}
      description={t("pages.user.aboutme.story.description")}
    >
      <div className="grid gap-4 text-sm leading-7 text-muted-foreground md:grid-cols-3">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{t(`pages.user.aboutme.story.${paragraph}`)}</p>
        ))}
      </div>
    </BentoTile>
  );
}
