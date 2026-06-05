import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";

const experienceItems = [
  { key: "school", icon: GraduationCap },
  { key: "practice", icon: BriefcaseBusiness },
];

export function AboutExperiencePanel() {
  const { t } = useTranslation();

  return (
    <BentoTile
      eyebrow={t("pages.user.aboutme.experience.eyebrow")}
      title={t("pages.user.aboutme.experience.title")}
      className="h-full"
    >
      <div className="grid gap-3">
        {experienceItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              className="grid grid-cols-[auto_1fr] gap-3 rounded-tile border border-border bg-surface-inset p-4"
            >
              <span className="flex size-10 items-center justify-center rounded-control border border-border bg-surface text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <h3 className="font-black text-foreground">
                  {t(`pages.user.aboutme.experience.items.${item.key}.title`)}
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {t(
                    `pages.user.aboutme.experience.items.${item.key}.description`,
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </BentoTile>
  );
}
