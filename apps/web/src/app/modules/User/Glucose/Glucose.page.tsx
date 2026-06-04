import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { GlucoseCurrent } from "@/app/modules/User/Glucose/GlucoseCurrent.tsx";
import { GlucoseNavigation } from "@/app/modules/User/Glucose/GlucoseNavigation.tsx";
import { navigationItems } from "@/app/modules/User/Glucose/GlucoseNavigation.items.tsx";
import { type ReactElement, useEffect } from "react";
import { useSearchParams } from "react-router";
import { UserHeader } from "@/app/layouts/User/Header/UserHeader.tsx";

export function GlucosePage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const sections = navigationItems;

  useEffect(() => {
    const section = searchParams.get("section");
    const selected = sections.find((s) => s.param === section);
    if (!selected) {
      setSearchParams({ section: sections[0].param });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const renderSection = (): ReactElement | null => {
    if (!navigationItems || navigationItems.length === 0) return null;
    const section = searchParams.get("section");
    const selected = sections.find((s) => s.param === section);
    return selected ? selected.element : navigationItems[0].element;
  };

  return (
    <>
      <UserHeader
        title={t("pages.user.glucose.title")}
        subtitle={t("pages.user.glucose.subtitle")}
      />
      <motion.div
        className="space-y-6 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <GlucoseCurrent />

        <GlucoseNavigation />

        {renderSection()}
      </motion.div>
    </>
  );
}
