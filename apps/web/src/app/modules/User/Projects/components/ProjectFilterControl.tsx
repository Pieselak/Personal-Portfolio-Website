import {
  Calendar,
  CalendarCheck,
  CalendarRange,
  FolderKanban,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { SegmentedControl } from "@/app/components/ui/SegmentedControl.tsx";
import type { ProjectFilter } from "@/app/modules/User/Projects/types/project.types.ts";

type ProjectFilterControlProps = {
  value: ProjectFilter;
  onChange: (value: ProjectFilter) => void;
};

export function ProjectFilterControl({
  value,
  onChange,
}: ProjectFilterControlProps) {
  const { t } = useTranslation();

  return (
    <div className="sticky top-3 z-20 flex w-full justify-start">
      <SegmentedControl<ProjectFilter>
        ariaLabel={t("pages.user.projects.filterLabel")}
        value={value}
        onChange={onChange}
        mobileLayout="stack"
        className="w-full backdrop-blur-xl sm:w-auto"
        options={[
          {
            value: "all",
            label: t("pages.user.projects.filters.all"),
            icon: <FolderKanban className="size-4" />,
          },
          {
            value: "completed",
            label: t("pages.user.projects.filters.completed"),
            icon: <CalendarCheck className="size-4" />,
          },
          {
            value: "inProgress",
            label: t("pages.user.projects.filters.inProgress"),
            icon: <CalendarRange className="size-4" />,
          },
          {
            value: "planned",
            label: t("pages.user.projects.filters.planned"),
            icon: <Calendar className="size-4" />,
          },
        ]}
      />
    </div>
  );
}
