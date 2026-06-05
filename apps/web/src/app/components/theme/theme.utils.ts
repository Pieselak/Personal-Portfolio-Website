import type { ThemeMode } from "@/app/components/theme/theme.types.ts";

export const THEME_STORAGE_KEY = "theme";

export function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";

  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
  if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "contrast") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyTheme(theme: ThemeMode) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.classList.toggle("contrast", theme === "contrast");
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}
