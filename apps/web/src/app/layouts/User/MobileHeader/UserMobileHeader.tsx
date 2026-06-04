import { useState } from "react";
import {
  LanguagesIcon,
  MenuIcon,
  MoonStarIcon,
  SunIcon,
  XIcon,
} from "lucide-react";
import type { navigationItem } from "@/app/layouts/User/User.layout.tsx";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import useTheme from "@/app/hooks/useTheme.ts";
import { IconButton } from "@/app/components/ui.tsx";
import { cn } from "@/app/components/cn.ts";

type UserMobileHeaderProps = {
  navigationItems: navigationItem[];
};

export function UserMobileHeader({ navigationItems }: UserMobileHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useTheme();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/88 backdrop-blur-xl">
      <div className="flex h-18 items-center justify-between px-4">
        <Link to="/home" className="min-w-0">
          <p className="truncate text-xl font-semibold text-foreground">
            Patryk Znamirowski
          </p>
          <p className="truncate text-xs font-medium text-muted-foreground">
            Student developer portfolio
          </p>
        </Link>
        <IconButton
          label={t("layouts.user.nav.openMenu")}
          onClick={() => setMenuOpen(true)}
        >
          <MenuIcon className="size-4.5" />
        </IconButton>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/96 px-4 py-4 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-semibold text-foreground">
                  Navigation
                </p>
                <p className="text-xs font-medium text-muted-foreground">
                  Portfolio sections
                </p>
              </div>
              <IconButton
                label={t("layouts.user.nav.closeMenu")}
                onClick={() => setMenuOpen(false)}
              >
                <XIcon className="size-4.5" />
              </IconButton>
            </div>

            <nav className="mt-8 grid gap-2">
              {navigationItems.map((navigationItem) => {
                const isActive =
                  pathname.split("/")[1] === navigationItem.url.substring(1);
                const Icon = navigationItem.icon;

                return (
                  <Link
                    key={navigationItem.url}
                    to={navigationItem.url}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex min-h-14 items-center gap-3 rounded-md border px-4 text-base font-semibold transition-colors",
                      isActive
                        ? "border-ring bg-secondary text-foreground"
                        : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground",
                    )}
                  >
                    {Icon && <Icon className="size-5" />}
                    {t(`layouts.user.nav.pages.${navigationItem.label}`)}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 flex gap-2">
              <Link
                to="/language"
                onClick={() => setMenuOpen(false)}
                className="flex-1"
              >
                <button className="flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-border bg-card text-sm font-semibold text-foreground">
                  <LanguagesIcon className="size-4.5" />
                  {t("layouts.user.nav.changeLanguage")}
                </button>
              </Link>
              <button
                className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md border border-border bg-card text-sm font-semibold text-foreground"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? (
                  <MoonStarIcon className="size-4.5" />
                ) : (
                  <SunIcon className="size-4.5" />
                )}
                {t("layouts.user.nav.changeTheme")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
