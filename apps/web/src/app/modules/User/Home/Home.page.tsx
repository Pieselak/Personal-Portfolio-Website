import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, FoldersIcon, CandyIcon, UserIcon } from "lucide-react";
import { UserHeader } from "@/app/layouts/User/Header/UserHeader.tsx";

export function HomePage() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  const sections = [
    {
      icon: UserIcon,
      key: "aboutme",
      link: "/about",
    },
    {
      icon: FoldersIcon,
      key: "projects",
      link: "/projects",
    },
    {
      icon: CandyIcon,
      key: "glucose",
      link: "/glucose",
    },
  ];

  return (
    <motion.div
      className="space-y-6 w-full md:w-auto max-w-2xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <UserHeader
        title={t("pages.user.home.title")}
        subtitle={t("pages.user.home.subtitle")}
      />

      {/* Call to Action Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
      >
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.link}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              custom={index}
            >
              <Link
                to={section.link}
                className="flex flex-col h-full p-5 bg-card border border-border rounded-xl hover:border-ring shadow-sm hover:shadow-md group transition-all duration-300 overflow-hidden relative"
              >
                {/* Content */}
                <div className="relative z-10 flex flex-col items-start gap-3">
                  <motion.div
                    className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <Icon
                      size={24}
                      className="text-accent group-hover:text-accent transition-colors"
                    />
                  </motion.div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-primary group-hover:text-accent transition-colors">
                      {t(`pages.user.${section.key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`pages.user.home.sections.${section.key}.description`)}
                    </p>
                  </div>

                  <motion.div
                    className="mt-auto flex items-center gap-2 text-accent text-sm font-medium"
                    whileHover={{ x: 4 }}
                  >
                    {t("pages.user.home.explore")}
                    <ArrowRight size={16} />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Additional Info Section */}
      <motion.div
        className="bg-card border border-border rounded-xl p-6 md:p-8"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">
            {t("pages.user.home.welcome")}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("pages.user.home.welcomeDescription")}
          </p>
          <div className="flex flex-wrap gap-2 pt-4">
            {(
              t("pages.user.home.skills", { returnObjects: true }) as string[]
            ).map((skill: string) => (
              <span
                key={skill}
                className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
