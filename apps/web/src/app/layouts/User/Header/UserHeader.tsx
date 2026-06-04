import useTheme from "@/app/hooks/useTheme.ts";
import { IconButton } from "@/app/components/ui.tsx";
import { cn } from "@/app/components/cn.ts";
import { LanguagesIcon, MoonStarIcon, SunIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { navigationItem } from "@/app/layouts/User/User.layout.tsx";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

type userHeaderProps = {
  navigationItems: navigationItem[];
};

export function UserHeader({ navigationItems }: userHeaderProps) {
  const [theme, setTheme] = useTheme();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/86 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
        <Link to="/home" className="group min-w-0">
          <p className="text-2xl font-semibold leading-none text-foreground">
            Patryk Znamirowski
          </p>
          <p className="mt-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-accent">
            Student developer portfolio
          </p>
        </Link>

        <nav className="flex items-center gap-1 rounded-md border border-border bg-card/75 p-1 shadow-sm">
          {navigationItems.map((navigationItem) => {
            const isActive =
              pathname.split("/")[1] === navigationItem.url.substring(1);
            const Icon = navigationItem.icon;

            return (
              <Link
                key={navigationItem.url}
                to={navigationItem.url}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-sm border px-3 text-sm font-semibold transition-[background-color,border-color,color] duration-200",
                  isActive
                    ? "border-ring bg-secondary text-foreground"
                    : "border-transparent text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {Icon && <Icon className="size-4" />}
                {t(`layouts.user.nav.pages.${navigationItem.label}`)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/language">
            <IconButton label={t("layouts.user.nav.changeLanguage")}>
              <LanguagesIcon className="size-4.5" />
            </IconButton>
          </Link>
          <IconButton
            label={t("layouts.user.nav.changeTheme")}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <MoonStarIcon className="size-4.5" />
            ) : (
              <SunIcon className="size-4.5" />
            )}
          </IconButton>
        </div>
      </div>
    </motion.header>
  );
}
