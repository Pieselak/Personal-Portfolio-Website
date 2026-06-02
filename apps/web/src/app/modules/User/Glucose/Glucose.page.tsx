import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { GlucoseCurrent } from "@/app/modules/User/Glucose/GlucoseCurrent.tsx";
import { GlucoseNavigation } from "@/app/modules/User/Glucose/GlucoseNavigation.tsx";
import { navigationItems } from "@/app/modules/User/Glucose/GlucoseNavigation.items.tsx";
import { type ReactElement, useEffect } from "react";
import { useSearchParams } from "react-router";

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
    <div className="flex flex-col justify-start items-center">
      <motion.div
        className="space-y-6 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex flex-col gap-1" variants={itemVariants}>
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            {t("pages.user.glucose.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("pages.user.glucose.subtitle")}
          </p>
        </motion.div>

        <GlucoseCurrent />

        <GlucoseNavigation />

        {renderSection()}
      </motion.div>
    </div>
  );
}
