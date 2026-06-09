export function formatProjectDate(
  date: string | null | undefined,
  language: string,
) {
  if (date === null || date === undefined) return "-";
  return new Intl.DateTimeFormat(language, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
