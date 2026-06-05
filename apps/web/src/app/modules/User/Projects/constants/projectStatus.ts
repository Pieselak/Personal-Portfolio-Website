import {
  Calendar,
  CalendarCheck,
  CalendarRange,
  CheckCircle2,
} from "lucide-react";
import type { Tone } from "@/app/components/ui/tone.ts";
import type { ProjectStatus } from "@/app/modules/User/Projects/types/project.types.ts";

export const projectStatusTone = {
  completed: "green",
  inProgress: "yellow",
  planned: "gray",
} satisfies Record<ProjectStatus, Tone>;

export const projectStatusIcon = {
  completed: CalendarCheck,
  inProgress: CalendarRange,
  planned: Calendar,
} satisfies Record<ProjectStatus, typeof CheckCircle2>;
