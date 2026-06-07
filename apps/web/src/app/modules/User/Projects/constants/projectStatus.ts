import {
  Calendar,
  CalendarCheck,
  CalendarRange,
  CalendarX,
  CheckCircle2,
} from "lucide-react";
import type { Tone } from "@/app/components/ui/tone.ts";
import type { ProjectStatus } from "@/app/modules/User/Projects/types/project.types.ts";

export const projectStatusTone = {
  completed: "green",
  inProgress: "yellow",
  planned: "gray",
  onHold: "orange",
} satisfies Record<ProjectStatus, Tone>;

export const projectStatusIcon = {
  completed: CalendarCheck,
  inProgress: CalendarRange,
  planned: Calendar,
  onHold: CalendarX,
} satisfies Record<ProjectStatus, typeof CheckCircle2>;
