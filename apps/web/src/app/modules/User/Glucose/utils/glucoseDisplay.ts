import {
  GlucoseColor,
  GlucoseTrend,
  type GetTimeInRangeResponse,
} from "@/app/api/generated-api.ts";
import { GLUCOSE_COLOR_TONE } from "@/app/modules/User/Glucose/constants/glucoseRanges.ts";
import { getToneClasses, type Tone } from "@/app/components/ui/tone.ts";

export type RangeSegment = {
  key: keyof Pick<
    GetTimeInRangeResponse,
    | "percentageHigh"
    | "percentageAboveRange"
    | "percentageInRange"
    | "percentageBelowRange"
    | "percentageLow"
  >;
  labelKey: string;
  value: number;
  tone: Tone;
};

export function getGlucoseTone(color?: GlucoseColor | string): Tone {
  if (
    color === GlucoseColor.Green ||
    color === GlucoseColor.Yellow ||
    color === GlucoseColor.Orange ||
    color === GlucoseColor.Red ||
    color === GlucoseColor.None
  ) {
    return GLUCOSE_COLOR_TONE[color];
  }

  return "gray";
}

export function getGlucoseColorClasses(color?: GlucoseColor | string) {
  return getToneClasses(getGlucoseTone(color));
}

export function getTrendRotation(trend?: GlucoseTrend) {
  return getTrendIndicatorConfig(trend).rotation;
}

export function getTrendIndicatorConfig(trend?: GlucoseTrend) {
  switch (trend) {
    case GlucoseTrend.RisingFast:
      return { arrowCount: 2, rotation: 0 };
    case GlucoseTrend.Rising:
      return { arrowCount: 1, rotation: 0 };
    case GlucoseTrend.RisingSlow:
      return { arrowCount: 1, rotation: 45 };
    case GlucoseTrend.Stable:
      return { arrowCount: 1, rotation: 90 };
    case GlucoseTrend.FallingSlow:
      return { arrowCount: 1, rotation: 135 };
    case GlucoseTrend.Falling:
      return { arrowCount: 1, rotation: 180 };
    case GlucoseTrend.FallingFast:
      return { arrowCount: 2, rotation: 180 };
    default:
      return { arrowCount: 1, rotation: 0 };
  }
}

export function getTimeInRangeSegments(
  data: GetTimeInRangeResponse,
): RangeSegment[] {
  return [
    {
      key: "percentageHigh",
      labelKey: "pages.user.glucose.ranges.high",
      value: data.percentageHigh,
      tone: "orange",
    },
    {
      key: "percentageAboveRange",
      labelKey: "pages.user.glucose.ranges.aboveRange",
      value: data.percentageAboveRange,
      tone: "yellow",
    },
    {
      key: "percentageInRange",
      labelKey: "pages.user.glucose.ranges.inRange",
      value: data.percentageInRange,
      tone: "green",
    },
    {
      key: "percentageBelowRange",
      labelKey: "pages.user.glucose.ranges.belowRange",
      value: data.percentageBelowRange,
      tone: "yellow",
    },
    {
      key: "percentageLow",
      labelKey: "pages.user.glucose.ranges.low",
      value: data.percentageLow,
      tone: "red",
    },
  ];
}

export function getSensorLifePercent(
  activatedAt?: number | null,
  expireAt?: number | null,
  expireIn?: number | null,
) {
  if (!activatedAt || !expireAt || !expireIn) return 0;
  const maxTime = expireAt - activatedAt;
  if (maxTime <= 0) return 0;
  return Math.round((expireIn / maxTime) * 100);
}
