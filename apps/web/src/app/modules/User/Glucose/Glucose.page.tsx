import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { GlucoseCurrent } from "@/app/modules/User/Glucose/GlucoseCurrent.tsx";
import { GlucoseNavigation } from "@/app/modules/User/Glucose/GlucoseNavigation.tsx";
import { navigationItems } from "@/app/modules/User/Glucose/GlucoseNavigation.items.tsx";
import { type ReactElement, useEffect } from "react";
import { useSearchParams } from "react-router";
import { SectionHeader } from "@/app/components/ui.tsx";

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
  }, [searchParams, sections, setSearchParams]);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const renderSection = (): ReactElement | null => {
    if (!navigationItems || navigationItems.length === 0) return null;
    const section = searchParams.get("section");
    const selected = sections.find((s) => s.param === section);
    return selected ? selected.element : null;
  };

  return (
    <div className="w-full">
      <motion.div
        className="w-full space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <SectionHeader
            eyebrow={t("pages.user.glucose.eyebrow")}
            title={t("pages.user.glucose.title")}
            description={t("pages.user.glucose.subtitle")}
          />
        </motion.div>

        <GlucoseCurrent />

        <GlucoseNavigation />

        {renderSection()}
      </motion.div>
    </div>
  );
}
