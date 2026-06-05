import { Activity, FolderKanban, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";

type HomeFocusGridProps = {
  title: string;
  description: string;
};

const focusItems = [
  { key: "projects", icon: FolderKanban, to: "/projects" },
  { key: "learning", icon: GraduationCap, to: "/about" },
  { key: "glucose", icon: Activity, to: "/glucose" },
];

export function HomeFocusGrid({ title, description }: HomeFocusGridProps) {
  const { t } = useTranslation();

  return (
    <BentoTile title={title} description={description}>
      <div className="grid gap-3 md:grid-cols-3">
        {focusItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.key}
              to={item.to}
              className="group flex min-h-52 flex-col justify-between rounded-tile border border-border bg-surface-inset p-4 transition-colors duration-200 hover:border-ring hover:bg-surface-raised"
            >
              <span className="flex size-11 items-center justify-center rounded-control border border-border bg-surface text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <h3 className="text-lg font-black text-foreground">
                  {t(`pages.user.home.focus.items.${item.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {t(`pages.user.home.focus.items.${item.key}.description`)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </BentoTile>
  );
}
