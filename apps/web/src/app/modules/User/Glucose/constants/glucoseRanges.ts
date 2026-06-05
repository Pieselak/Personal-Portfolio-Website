import { GlucoseColor } from "@/app/api/generated-api.ts";
import type { Tone } from "@/app/components/ui/tone.ts";

export const GLUCOSE_COLOR_TONE: Record<GlucoseColor, Tone> = {
  [GlucoseColor.None]: "gray",
  [GlucoseColor.Green]: "green",
  [GlucoseColor.Yellow]: "yellow",
  [GlucoseColor.Orange]: "orange",
  [GlucoseColor.Red]: "red",
};

export const GLUCOSE_RANGE_TONES = {
  low: "red",
  belowRange: "yellow",
  inRange: "green",
  aboveRange: "yellow",
  high: "orange",
} satisfies Record<string, Tone>;
