export type GlucoseTimeRange = "1d" | "7d" | "14d" | "30d" | "90d" | "all";

export const GLUCOSE_TIME_RANGES: GlucoseTimeRange[] = [
  "1d",
  "7d",
  "14d",
  "30d",
  "90d",
];

export const GLUCOSE_TIME_RANGES_WITH_ALL: GlucoseTimeRange[] = [
  ...GLUCOSE_TIME_RANGES,
  "all",
];

export const GLUCOSE_TIME_RANGE_HOURS = {
  "1d": 24,
  "7d": 168,
  "14d": 336,
  "30d": 720,
  "90d": 2160,
  all: undefined,
} satisfies Record<GlucoseTimeRange, number | undefined>;

export function getGlucoseRangeHours(range: GlucoseTimeRange) {
  return GLUCOSE_TIME_RANGE_HOURS[range];
}

export function isRangeShorterThanSevenDays(range: GlucoseTimeRange) {
  const hours = getGlucoseRangeHours(range);
  return typeof hours === "number" && hours < GLUCOSE_TIME_RANGE_HOURS["7d"];
}
