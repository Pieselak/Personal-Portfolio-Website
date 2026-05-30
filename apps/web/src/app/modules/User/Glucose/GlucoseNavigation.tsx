import { useTranslation } from "react-i18next";
import { LineChart, Target, BarChart3, type LucideIcon } from "lucide-react";
import { useSearchParams } from "react-router";
import type { ReactElement } from "react";
import { GlucoseGraph } from "@/app/modules/User/Glucose/GlucoseGraph.tsx";
import { GlucoseTimeInRange } from "@/app/modules/User/Glucose/GlucoseTimeInRange.tsx";
import { GlucoseSummary } from "@/app/modules/User/Glucose/GlucoseSummary.tsx";

export const navigationItems: Array<{
  label: string;
  param: string;
  icon: LucideIcon;
  element: ReactElement;
}> = [
  {
    label: "graph",
    param: "graph",
    icon: LineChart,
    element: <GlucoseGraph />,
  },
  {
    label: "timeInRange",
    param: "time-in-range",
    icon: Target,
    element: <GlucoseTimeInRange />,
  },
  {
    label: "summary",
    param: "summary",
    icon: BarChart3,
    element: <GlucoseSummary />,
  },
];

export function GlucoseNavigation() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex justify-center gap-3 w-full max-w-md mx-auto">
      {navigationItems.map((navigationItem) => {
        const Icon = navigationItem.icon;
        const active = navigationItem.param == searchParams.get("section");

        return (
          <button
            key={navigationItem.param}
            onClick={() => setSearchParams({ section: navigationItem.param })}
            className={`flex-1 flex flex-col items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-250 font-medium text-sm cursor-pointer ${
              active
                ? "bg-accent/20 border-ring text-primary shadow-sm"
                : "bg-muted/50 border-border text-muted-foreground hover:bg-muted"
            }`}
          >
            <Icon size={20} />
            <span className="hidden sm:inline text-xs">
              {t(
                `pages.user.glucose.subpages.${navigationItem.label}.navigation`,
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
