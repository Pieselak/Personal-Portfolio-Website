import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function UserFooter() {
  const { t } = useTranslation();
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      className="w-full bg-background border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Copyright - Top */}
        <div className="flex justify-center items-center mb-6 pb-6 border-b border-border/50">
          <p className="text-md font-bold text-primary">
            {t("layouts.user.footer.copyright", {
              year: new Date().getFullYear(),
            })}
          </p>
        </div>

        {/* Links - Bottom */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-muted-foreground">
          <Link
            to="contact"
            className="hover:text-primary transition-colors duration-250"
          >
            {t("layouts.user.footer.contact")}
          </Link>
          <span className="hidden sm:inline text-border/50">•</span>
          <Link
            to="terms"
            className="hover:text-primary transition-colors duration-250"
          >
            {t("layouts.user.footer.termsOfService")}
          </Link>
          <span className="hidden sm:inline text-border/50">•</span>
          <Link
            to="privacy"
            className="hover:text-primary transition-colors duration-250"
          >
            {t("layouts.user.footer.privacyPolicy")}
          </Link>
        </div>
      </div>
    </motion.footer>
  );
}
