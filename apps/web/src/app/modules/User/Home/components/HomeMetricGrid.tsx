import { BookOpen, Code2, Flame } from "lucide-react";
import { useTranslation } from "react-i18next";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";

const metrics = [
  { key: "education", icon: BookOpen },
  { key: "practice", icon: Code2 },
  { key: "motivation", icon: Flame },
];

export function HomeMetricGrid() {
  const { t } = useTranslation();

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <BentoTile key={metric.key} className="min-h-40">
            <div className="flex h-full flex-col justify-between gap-5">
              <span className="flex size-11 items-center justify-center rounded-control border border-border bg-surface-inset text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="text-2xl font-black text-foreground">
                  {t(`pages.user.home.metrics.${metric.key}.value`)}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {t(`pages.user.home.metrics.${metric.key}.label`)}
                </p>
              </div>
            </div>
          </BentoTile>
        );
      })}
    </div>
  );
}
