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
import { UserNavigation } from "@/app/layouts/User/Navigation/UserNavigation.tsx";
import { UserMobileNavigation } from "@/app/layouts/User/MobileNavigation/UserMobileNavigation.tsx";

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
      <div className="flex flex-col justify-start items-center min-h-dvh overflow-x-hidden">
        {isMobile ? (
          <UserMobileNavigation navigationItems={navigationItems} />
        ) : (
          <UserNavigation navigationItems={navigationItems} />
        )}

        <AnimatePresence
          mode="wait"
          onExitComplete={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{ ease: "easeInOut" }}
            className="flex flex-col flex-1 justify-start items-center overflow-hidden gap-3 md:gap-6 p-3 md:p-6 max-w-6xl w-full"
          >
            {element}
          </motion.main>
        </AnimatePresence>

        <UserFooter />
      </div>
    </MotionConfig>
  );
}
