import { useEffect, useState } from "react";
import type { ThemeMode } from "@/app/components/theme/theme.types.ts";
import {
  applyTheme,
  getInitialTheme,
} from "@/app/components/theme/theme.utils.ts";

export default function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) return;
      const newTheme = e.matches ? "dark" : "light";
      setTheme(newTheme);
    };

    mq.addEventListener("change", handler);

    return () => mq.removeEventListener("change", handler);
  }, []);

  return [theme, setTheme] as const;
}
