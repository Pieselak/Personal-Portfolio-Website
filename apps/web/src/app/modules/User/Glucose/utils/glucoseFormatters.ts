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
  if (milliseconds === null || milliseconds === undefined) return "-";
  if (!Number.isFinite(milliseconds) || milliseconds < 0) return "-";

  const totalMinutes = Math.ceil(milliseconds / 60_000);
  const days = Math.floor(totalMinutes / 1_440);
  const hours = Math.floor((totalMinutes % 1_440) / 60);
  const minutes = totalMinutes % 60;
  const formatter = new Intl.DurationFormat(language, { style: "short" });

  if (days > 0) return formatter.format({ days, hours });
  if (hours > 0) return formatter.format({ hours, minutes });

  return formatter.format({ minutes });
}

export function formatPercent(value: number, language: string) {
  return new Intl.NumberFormat(language, {
    maximumFractionDigits: 1,
  }).format(value);
}
