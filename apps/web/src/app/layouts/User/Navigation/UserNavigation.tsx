import useTheme from "@/app/hooks/useTheme.ts";
import { LanguagesIcon, MoonStarIcon, SunIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { navigationItem } from "@/app/layouts/User/User.layout.tsx";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

type userNavigationProps = {
  navigationItems: navigationItem[];
};

export function UserNavigation({ navigationItems }: userNavigationProps) {
  const [theme, setTheme] = useTheme();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const navigationVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={navigationVariants}
      className="flex justify-center items-center gap-2.5 mt-3 overflow-x-hidden z-50 w-full"
    >
      <motion.div
        tabIndex={-1}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/language"
          className="flex items-center p-2.5 bg-card rounded-xl border border-border hover:border-ring cursor-pointer transition-[border-color] duration-250"
          aria-label={t("layouts.user.nav.changeLanguage")}
        >
          <LanguagesIcon className="size-4.5" />
        </Link>
      </motion.div>
      <nav className="flex bg-card backdrop-blur-sm border border-border rounded-xl p-1.5 gap-1">
        {navigationItems.map((navigationItem) => (
          <Link
            key={navigationItem.url}
            to={navigationItem.url}
            className={`flex gap-1 items-center border px-2 py-1 rounded-md cursor-pointer font-semibold transition-[border-color, background-color] duration-250 ${
              pathname.split("/")[1] === navigationItem.url.substring(1)
                ? "border-ring bg-muted text-accent-foreground"
                : "border-transparent text-muted-foreground hover:border-ring hover:text-primary"
            }`}
          >
            {navigationItem.icon && (
              <navigationItem.icon className="size-4.5" />
            )}
            {t(`layouts.user.nav.pages.${navigationItem.label}`)}
          </Link>
        ))}
      </nav>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center p-2.5 bg-card rounded-xl border border-border hover:border-ring cursor-pointer transition-[border-color] duration-250"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label={t("layouts.user.nav.changeTheme")}
      >
        {theme === "light" ? (
          <MoonStarIcon className="size-4.5" />
        ) : (
          <SunIcon className="size-4.5" />
        )}
      </motion.button>
    </motion.div>
  );
}
