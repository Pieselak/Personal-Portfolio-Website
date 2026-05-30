import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useLocation, useOutlet } from "react-router-dom";
import {
  type LucideIcon,
  CandyIcon,
  FoldersIcon,
  HomeIcon,
  UserIcon,
} from "lucide-react";

import useIsMobile from "@/app/hooks/useIsMobile.ts";
import { UserFooter } from "@/app/layouts/User/Footer/UserFooter.tsx";
import { UserHeader } from "@/app/layouts/User/Header/UserHeader.tsx";
import { UserMobileHeader } from "@/app/layouts/User/MobileHeader/UserMobileHeader.tsx";

export type navigationItem = {
  label: string;
  icon?: LucideIcon;
  url: string;
};

const navigationItems: navigationItem[] = [
  { label: "home", icon: HomeIcon, url: "/home" },
  { label: "aboutme", icon: UserIcon, url: "/about" },
  { label: "projects", icon: FoldersIcon, url: "/projects" },
  { label: "glucose", icon: CandyIcon, url: "/glucose" },
];

export function UserLayout() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const element = useOutlet();

  return (
    <MotionConfig transition={{ duration: 0.25, ease: "easeInOut" }}>
      <div className="flex flex-col justify-start items-center min-h-dvh">
        {isMobile ? (
          <UserMobileHeader navigationItems={navigationItems} />
        ) : (
          <UserHeader navigationItems={navigationItems} />
        )}

        <AnimatePresence
          mode="wait"
          onExitComplete={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ ease: "easeInOut" }}
            className="flex flex-1 justify-center items-start overflow-hidden p-3 max-w-6xl w-full"
          >
            {element}
          </motion.main>
        </AnimatePresence>

        <UserFooter />
      </div>
    </MotionConfig>
  );
}
