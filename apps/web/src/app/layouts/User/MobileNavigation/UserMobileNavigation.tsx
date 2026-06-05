import { motion } from "framer-motion";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import type { navigationItem } from "@/app/layouts/User/User.layout.tsx";
import { MobileNavigationDrawer } from "@/app/layouts/User/MobileNavigation/components/MobileNavigationDrawer.tsx";
import { MobileNavigationTopBar } from "@/app/layouts/User/MobileNavigation/components/MobileNavigationTopBar.tsx";

type UserMobileNavigationProps = {
  navigationItems: navigationItem[];
};

export function UserMobileNavigation({
  navigationItems,
}: UserMobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const activePath = pathname.split("/")[1];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-3 z-40 mt-3 w-full px-3"
      >
        <MobileNavigationTopBar onOpenMenu={() => setIsOpen(true)} />
      </motion.header>

      <MobileNavigationDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navigationItems={navigationItems}
        activePath={activePath}
      />
    </>
  );
}
