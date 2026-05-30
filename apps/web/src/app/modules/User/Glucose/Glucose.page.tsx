import { useTranslation } from "react-i18next";
import { GlucoseCurrent } from "@/app/modules/User/Glucose/GlucoseCurrent.tsx";
import {
  GlucoseNavigation,
  navigationItems,
} from "@/app/modules/User/Glucose/GlucoseNavigation.tsx";
import { type ReactElement, useEffect } from "react";
import { useSearchParams } from "react-router";

export function GlucosePage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const sections = navigationItems;

  useEffect(() => {
    const section = searchParams.get("section");
    const selected = sections.find((s) => s.param === section);
    if (!selected) {
      setSearchParams({ section: sections[0].param });
    }
  }, [searchParams, sections, setSearchParams]);

  const renderSection = (): ReactElement | null => {
    if (!navigationItems || navigationItems.length === 0) return null;
    const section = searchParams.get("section");
    const selected = sections.find((s) => s.param === section);
    return selected ? (
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        {selected.element}
      </div>
    ) : null;
  };

  return (
    <div className="flex flex-col justify-start items-center">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            {t("pages.user.glucose.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("pages.user.glucose.subtitle")}
          </p>
        </div>

        <GlucoseCurrent />

        <GlucoseNavigation />

        {renderSection()}
      </div>
    </div>
  );
}
