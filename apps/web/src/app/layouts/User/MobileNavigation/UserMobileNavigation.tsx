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
import { motion, AnimatePresence } from "framer-motion";
import useTheme from "@/app/hooks/useTheme.ts";

type UserMobileNavigationProps = {
  navigationItems: navigationItem[];
};

export function UserMobileNavigation({
  navigationItems,
}: UserMobileNavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useTheme();
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <header className="flex justify-start items-center w-full gap-2.5 mt-3 z-50">
      <motion.div
        initial="hidden"
        animate={menuOpen ? "exit" : "visible"}
        variants={menuVariants}
        className="flex justify-between items-center gap-2.5 px-3"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMenuOpen(true)}
          className="flex items-center p-2.5 bg-card rounded-xl border border-border hover:border-ring cursor-pointer transition-[border-color] duration-250"
          aria-label={t("layouts.user.nav.openMenu")}
        >
          <MenuIcon className="size-4.5" />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="fixed flex flex-col justify-start items-center top-0 w-full min-h-dvh p-3 gap-2.5 bg-background/90 backdrop-blur-sm border-b border-border"
          >
            <div className="flex flex-row items-center justify-between w-full gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="flex items-center p-2.5 bg-card rounded-xl border border-border hover:border-ring cursor-pointer transition-[border-color] duration-250"
                aria-label={t("layouts.user.nav.closeMenu")}
              >
                <XIcon className="size-4.5" />
              </motion.button>
              <div className="flex justify-between items-center gap-2.5">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center bg-card rounded-xl border border-border hover:border-ring cursor-pointer transition-[border-color] duration-250"
                >
                  <Link
                    to="/language"
                    className="p-2.5"
                    aria-label={t("layouts.user.nav.changeLanguage")}
                    onClick={() => setMenuOpen(false)}
                  >
                    <LanguagesIcon className="size-4.5" />
                  </Link>
                </motion.div>
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
              </div>
            </div>

            <motion.nav
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.1 }}
              className="flex w-full flex-col justify-center items-center gap-2"
            >
              {navigationItems.map((navigationItem, index) => (
                <motion.div
                  key={navigationItem.url}
                  custom={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setMenuOpen(false)}
                  className={`w-full`}
                >
                  <Link
                    to={navigationItem.url}
                    className={`flex gap-3 items-center px-3 py-2 w-full border border-border rounded-md cursor-pointer font-semibold transition-[border-color, background-color] duration-250 ${
                      pathname.split("/")[1] === navigationItem.url.substring(1)
                        ? "border-ring bg-muted text-accent-foreground"
                        : "bg-card text-muted-foreground hover:border-ring hover:text-primary"
                    }`}
                  >
                    {navigationItem.icon && (
                      <navigationItem.icon className="size-4.5" />
                    )}
                    {t(`layouts.user.nav.pages.${navigationItem.label}`)}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
