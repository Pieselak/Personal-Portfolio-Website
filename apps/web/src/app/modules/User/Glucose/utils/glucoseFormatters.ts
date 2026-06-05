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

export function formatPercent(value: number, language: string) {
  return new Intl.NumberFormat(language, {
    maximumFractionDigits: 1,
  }).format(value);
}
