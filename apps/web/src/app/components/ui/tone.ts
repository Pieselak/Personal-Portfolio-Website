export type Tone = "green" | "yellow" | "orange" | "red" | "gray";

export type ToneClasses = {
  bg: string;
  surface: string;
  border: string;
  text: string;
  fill: string;
  stroke: string;
};

export function getToneClasses(tone: Tone): ToneClasses {
  const classes: Record<Tone, ToneClasses> = {
    green: {
      bg: "bg-green-bg",
      surface: "bg-green-surface",
      border: "border-green-border",
      text: "text-green-text",
      fill: "bg-green-fill",
      stroke: "var(--green-fill)",
    },
    yellow: {
      bg: "bg-yellow-bg",
      surface: "bg-yellow-surface",
      border: "border-yellow-border",
      text: "text-yellow-text",
      fill: "bg-yellow-fill",
      stroke: "var(--yellow-fill)",
    },
    orange: {
      bg: "bg-orange-bg",
      surface: "bg-orange-surface",
      border: "border-orange-border",
      text: "text-orange-text",
      fill: "bg-orange-fill",
      stroke: "var(--orange-fill)",
    },
    red: {
      bg: "bg-red-bg",
      surface: "bg-red-surface",
      border: "border-red-border",
      text: "text-red-text",
      fill: "bg-red-fill",
      stroke: "var(--red-fill)",
    },
    gray: {
      bg: "bg-gray-bg",
      surface: "bg-gray-surface",
      border: "border-gray-border",
      text: "text-gray-text",
      fill: "bg-gray-fill",
      stroke: "var(--gray-fill)",
    },
  };

  return classes[tone];
}
