import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import { navigationItems } from "@/app/modules/User/Glucose/GlucoseNavigation.items.tsx";
import { cn } from "@/app/components/cn.ts";

export function GlucoseNavigation() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeSection = searchParams.get("section") ?? navigationItems[0].param;

  return (
    <nav className="flex w-full rounded-lg border border-border bg-card p-1 shadow-sm md:w-fit">
      <div className="grid w-full grid-cols-1 gap-1 sm:grid-cols-3 md:w-auto">
        {navigationItems.map((item) => {
          const isActive = activeSection === item.param;
          const Icon = item.icon;

          return (
            <button
              key={item.param}
              type="button"
              onClick={() => {
                const nextParams = new URLSearchParams(searchParams);
                nextParams.set("section", item.param);
                setSearchParams(nextParams);
              }}
              className={cn(
                "flex min-h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition-[border-color,background-color,color] duration-200 md:w-auto",
                isActive
                  ? "border-ring bg-secondary text-foreground"
                  : "border-transparent text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <Icon className="size-4.5 shrink-0" />
              <span>
                {t(`pages.user.glucose.subpages.${item.label}.navigation`)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
