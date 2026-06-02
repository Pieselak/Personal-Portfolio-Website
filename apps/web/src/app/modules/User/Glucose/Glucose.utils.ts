import {
  GlucoseColor,
  GlucoseTrend,
  type GetTimeInRangeResponse,
} from "@/app/api/generated-api.ts";

export const GLUCOSE_STATISTICS_HOURS = 24;

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
  className: string;
};

export function getGlucoseColorClasses(color?: GlucoseColor | string) {
  switch (color) {
    case GlucoseColor.Green:
      return {
        border: "border-green-border",
        bg: "bg-green-bg",
        text: "text-green-text",
        fill: "bg-green-glucose",
        stroke: "var(--green-glucose)",
      };
    case GlucoseColor.Yellow:
      return {
        border: "border-yellow-border",
        bg: "bg-yellow-bg",
        text: "text-yellow-text",
        fill: "bg-yellow-glucose",
        stroke: "var(--yellow-glucose)",
      };
    case GlucoseColor.Orange:
      return {
        border: "border-orange-border",
        bg: "bg-orange-bg",
        text: "text-orange-text",
        fill: "bg-orange-glucose",
        stroke: "var(--orange-glucose)",
      };
    case GlucoseColor.Red:
      return {
        border: "border-red-border",
        bg: "bg-red-bg",
        text: "text-red-text",
        fill: "bg-red-glucose",
        stroke: "var(--red-glucose)",
      };
    default:
      return {
        border: "border-gray-border",
        bg: "bg-gray-bg",
        text: "text-gray-text",
        fill: "bg-gray-text",
        stroke: "var(--gray-text)",
      };
  }
}

export function getTrendRotation(trend?: GlucoseTrend) {
  switch (trend) {
    case GlucoseTrend.RisingFast:
      return -45;
    case GlucoseTrend.Rising:
      return -25;
    case GlucoseTrend.RisingSlow:
      return -10;
    case GlucoseTrend.Stable:
      return 90;
    case GlucoseTrend.FallingSlow:
      return 170;
    case GlucoseTrend.Falling:
      return 205;
    case GlucoseTrend.FallingFast:
      return 225;
    default:
      return 90;
  }
}

export function formatGlucoseDate(
  timestamp: number | string | null | undefined,
  language: string,
) {
  if (timestamp === null || timestamp === undefined) return "-";
  const parsedTimestamp = Number(timestamp);
  if (Number.isNaN(parsedTimestamp)) return "-";

  return new Intl.DateTimeFormat(language, {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(parsedTimestamp));
}

export function formatGlucoseDuration(
  milliseconds: number | null | undefined,
  language: string,
) {
  if (!milliseconds || milliseconds < 0) return "-";

  const minutes = Math.max(1, Math.round(milliseconds / 60000));
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const remainingMinutes = minutes % 60;
  const formatter = new Intl.NumberFormat(language);

  if (days > 0) return `${formatter.format(days)}d ${formatter.format(hours)}h`;
  if (hours > 0) {
    return `${formatter.format(hours)}h ${formatter.format(remainingMinutes)}m`;
  }

  return `${formatter.format(remainingMinutes)}m`;
}

export function getTimeInRangeSegments(
  data: GetTimeInRangeResponse,
): RangeSegment[] {
  return [
    {
      key: "percentageHigh",
      labelKey: "pages.user.glucose.ranges.high",
      value: data.percentageHigh,
      className: "bg-orange-glucose",
    },
    {
      key: "percentageAboveRange",
      labelKey: "pages.user.glucose.ranges.aboveRange",
      value: data.percentageAboveRange,
      className: "bg-yellow-glucose",
    },
    {
      key: "percentageInRange",
      labelKey: "pages.user.glucose.ranges.inRange",
      value: data.percentageInRange,
      className: "bg-green-glucose",
    },
    {
      key: "percentageBelowRange",
      labelKey: "pages.user.glucose.ranges.belowRange",
      value: data.percentageBelowRange,
      className: "bg-yellow-glucose",
    },
    {
      key: "percentageLow",
      labelKey: "pages.user.glucose.ranges.low",
      value: data.percentageLow,
      className: "bg-red-glucose",
    },
  ];
}
