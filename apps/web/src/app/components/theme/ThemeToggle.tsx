import { ContrastIcon, MoonStarIcon, SunIcon } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import useTheme from "@/app/hooks/useTheme.ts";
import type { ThemeMode } from "@/app/components/theme/theme.types.ts";

const themeOrder: ThemeMode[] = ["light", "dark", "contrast"];

const themeMeta = {
  light: {
    Icon: SunIcon,
  },
  dark: {
    Icon: MoonStarIcon,
  },
  contrast: {
    Icon: ContrastIcon,
  },
} satisfies Record<
  ThemeMode,
  {
    Icon: typeof SunIcon;
  }
>;

type ThemeToggleProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function ThemeToggle({ className = "", ...props }: ThemeToggleProps) {
  const { t } = useTranslation();
  const [theme, setTheme] = useTheme();
  const { Icon } = themeMeta[theme];

  function cycleTheme() {
    const currentIndex = themeOrder.indexOf(theme);
    setTheme(themeOrder[(currentIndex + 1) % themeOrder.length]);
  }

  return (
    <button
      {...props}
      type="button"
      onClick={cycleTheme}
      className={`flex items-center justify-center p-2.5 bg-card rounded-xl border border-border hover:border-ring cursor-pointer transition-[border-color] duration-250 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${className}`}
      aria-label={t("layouts.user.nav.changeTheme")}
      title={t(`layouts.user.nav.themes.${theme}`)}
    >
      <Icon className="size-4.5" aria-hidden />
    </button>
  );
}
