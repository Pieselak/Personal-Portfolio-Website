import { LanguagesIcon, MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ThemeToggle } from "@/app/components/theme/ThemeToggle.tsx";

type MobileNavigationTopBarProps = {
  onOpenMenu: () => void;
};

export function MobileNavigationTopBar({
  onOpenMenu,
}: MobileNavigationTopBarProps) {
  const { t } = useTranslation();

  return (
    <div className="flex w-full items-center justify-between gap-2 rounded-tile border border-border bg-surface p-1.5">
      <button
        type="button"
        onClick={onOpenMenu}
        className="inline-flex min-h-10 items-center gap-2 rounded-control border border-border bg-surface-raised px-3 text-sm font-black text-foreground transition-[background-color,border-color,color] duration-200 hover:border-ring hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        aria-label={t("layouts.user.nav.openMenu")}
      >
        <MenuIcon className="size-4.5" aria-hidden />
        <span>Menu</span>
      </button>

      <div className="flex items-center gap-1">
        <Link
          to="/language"
          className="inline-flex size-10 items-center justify-center rounded-control border border-border bg-surface text-foreground transition-[background-color,border-color,color] duration-200 hover:border-ring hover:bg-surface-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-label={t("layouts.user.nav.changeLanguage")}
        >
          <LanguagesIcon className="size-4.5" aria-hidden />
        </Link>
        <ThemeToggle className="size-10 rounded-control bg-surface" />
      </div>
    </div>
  );
}
