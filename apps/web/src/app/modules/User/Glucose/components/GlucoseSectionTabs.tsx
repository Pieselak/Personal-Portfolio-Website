import { BarChart3, Clock, LineChart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SegmentedControl } from "@/app/components/ui/SegmentedControl.tsx";

export type GlucoseSection = "graph" | "timeinrange" | "summary";

type GlucoseSectionTabsProps = {
  value: GlucoseSection;
  onChange: (section: GlucoseSection) => void;
};

const sectionOptions = [
  { value: "graph" as const, label: "graph", icon: LineChart },
  { value: "timeinrange" as const, label: "timeInRange", icon: Clock },
  { value: "summary" as const, label: "summary", icon: BarChart3 },
];

export function GlucoseSectionTabs({ value, onChange }: GlucoseSectionTabsProps) {
  const { t } = useTranslation();

  return (
    <div className="flex w-full justify-start">
      <SegmentedControl<GlucoseSection>
        ariaLabel={t("pages.user.glucose.navigationLabel", {
          defaultValue: "Glucose sections",
        })}
        value={value}
        onChange={onChange}
        mobileLayout="stack"
        className="w-full backdrop-blur-xl sm:w-auto"
        options={sectionOptions.map((option) => {
          const Icon = option.icon;
          return {
            value: option.value,
            label: t(`pages.user.glucose.subpages.${option.label}.navigation`),
            icon: <Icon className="size-4" />,
          };
        })}
      />
    </div>
  );
}
