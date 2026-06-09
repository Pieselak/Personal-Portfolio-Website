import {
  Calendar,
  CalendarCheck2,
  CalendarClock,
  CalendarCog,
  type LucideIcon,
} from "lucide-react";
import type { Tone } from "@/app/components/ui/tone.ts";
import type { ProjectStatus } from "@/app/modules/User/Projects/types/project.types.ts";

export const projectStatusTone = {
  COMPLETED: "green",
  IN_PROGRESS: "yellow",
  PLANNED: "gray",
  ON_HOLD: "orange",
} satisfies Record<ProjectStatus, Tone>;

export const projectStatusIcon = {
  COMPLETED: CalendarCheck2,
  IN_PROGRESS: CalendarCog,
  ON_HOLD: CalendarClock,
  PLANNED: Calendar,
} satisfies Record<ProjectStatus, LucideIcon>;
