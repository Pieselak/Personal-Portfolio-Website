import { LanguagesIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { navigationItem } from "@/app/layouts/User/User.layout.tsx";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/app/components/theme/ThemeToggle.tsx";
import { UserAuthCard } from "@/app/layouts/User/components/UserAuthCard.tsx";

type userNavigationProps = {
  navigationItems: navigationItem[];
};

export function UserNavigation({ navigationItems }: userNavigationProps) {
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
      className="z-50 mt-3 flex w-full max-w-6xl items-center justify-between gap-3 px-3 md:px-6"
    >
      <nav className="flex min-w-0 bg-surface backdrop-blur-sm border border-border rounded-tile p-1.5 gap-1">
        {navigationItems.map((navigationItem) => (
          <Link
            key={navigationItem.url}
            to={navigationItem.url}
            className={`flex gap-1 max-lg:flex-col items-center border px-2 py-1 rounded-control cursor-pointer font-semibold transition-[border-color,background-color,color] duration-200 ${
              pathname.split("/")[1] === navigationItem.url.substring(1)
                ? "border-border-strong bg-surface-raised text-primary"
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
      <div className="flex min-w-0 items-center justify-end gap-2">
        <motion.div
          tabIndex={-1}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/language"
            className="flex items-center rounded-control border border-border bg-card p-2.5 transition-[border-color] duration-250 hover:border-ring focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-label={t("layouts.user.nav.changeLanguage")}
          >
            <LanguagesIcon className="size-4.5" />
          </Link>
        </motion.div>
        <ThemeToggle />
        <UserAuthCard />
      </div>
    </motion.div>
  );
}
