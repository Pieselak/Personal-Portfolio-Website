import { Brain, RefreshCcw, SearchCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";

const strengths = [
  { key: "curiosity", icon: Brain },
  { key: "flexibility", icon: RefreshCcw },
  { key: "determination", icon: SearchCheck },
];

export function AboutStrengthsGrid() {
  const { t } = useTranslation();

  return (
    <BentoTile
      eyebrow={t("pages.user.aboutme.strengths.eyebrow")}
      title={t("pages.user.aboutme.strengths.title")}
      description={t("pages.user.aboutme.strengths.description")}
    >
      <div className="grid gap-3 md:grid-cols-3">
        {strengths.map((strength) => {
          const Icon = strength.icon;

          return (
            <article
              key={strength.key}
              className="flex min-h-64 flex-col justify-between rounded-tile border border-border bg-surface-inset p-4"
            >
              <span className="flex size-11 items-center justify-center rounded-control border border-border bg-surface text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <h3 className="text-lg font-black text-foreground">
                  {t(`pages.user.aboutme.strengths.items.${strength.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {t(
                    `pages.user.aboutme.strengths.items.${strength.key}.description`,
                  )}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </BentoTile>
  );
}
