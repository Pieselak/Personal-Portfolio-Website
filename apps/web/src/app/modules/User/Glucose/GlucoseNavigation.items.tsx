import {
  BarChart3,
  LineChart,
  Clock,
  type LucideIcon,
  Syringe,
} from "lucide-react";
import type { ReactElement } from "react";
import { GlucoseGraph } from "@/app/modules/User/Glucose/GlucoseGraph.tsx";
import { GlucoseTimeInRange } from "@/app/modules/User/Glucose/GlucoseTimeInRange.tsx";
import { GlucoseSummary } from "@/app/modules/User/Glucose/GlucoseSummary.tsx";
import { GlucoseAboutDiabetes } from "@/app/modules/User/Glucose/GlucoseAboutDiabetes.tsx";

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
    param: "timeinrange",
    icon: Clock,
    element: <GlucoseTimeInRange />,
  },
  {
    label: "summary",
    param: "summary",
    icon: BarChart3,
    element: <GlucoseSummary />,
  },
  {
    label: "aboutDiabetes",
    param: "about-diabetes",
    icon: Syringe,
    element: <GlucoseAboutDiabetes />,
  },
];
