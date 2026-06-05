import { XIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { navigationItem } from "@/app/layouts/User/User.layout.tsx";
import { MobileNavigationDrawerItem } from "@/app/layouts/User/MobileNavigation/components/MobileNavigationDrawerItem.tsx";

type MobileNavigationDrawerProps = {
  isOpen: boolean;
  navigationItems: navigationItem[];
  activePath: string;
  onClose: () => void;
};

export function MobileNavigationDrawer({
  isOpen,
  navigationItems,
  activePath,
  onClose,
}: MobileNavigationDrawerProps) {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            onClick={onClose}
            aria-label={t("layouts.user.nav.closeMenu")}
          />

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex min-h-dvh w-[min(22rem,calc(100vw-2rem))] flex-col gap-4 border-r border-border bg-background p-3"
          >
            <div className="flex items-center justify-between gap-3 rounded-tile border border-border bg-surface p-2">
              <div className="min-w-0 px-2">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Patryk Znamirowski
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-control border border-border bg-surface text-foreground transition-[background-color,border-color,color] duration-200 hover:border-ring hover:bg-surface-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                aria-label={t("layouts.user.nav.closeMenu")}
              >
                <XIcon className="size-4.5" aria-hidden />
              </button>
            </div>

            <motion.nav
              aria-label={t("layouts.user.nav.mobileNavigation")}
              initial="hidden"
              animate="visible"
            >
              <motion.ul
                className="grid gap-2"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
              >
                {navigationItems.map((item) => (
                  <MobileNavigationDrawerItem
                    key={item.url}
                    item={item}
                    label={t(`layouts.user.nav.pages.${item.label}`)}
                    isActive={activePath === item.url.substring(1)}
                    onSelect={onClose}
                  />
                ))}
              </motion.ul>
            </motion.nav>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
