import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function UserFooter() {
  const { t } = useTranslation();

  return (
    <footer className="w-full border-t border-border/70 bg-background/80">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <p className="text-2xl font-semibold text-foreground">
            Patryk Znamirowski
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {t("layouts.user.footer.positioning")}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-muted-foreground">
          <Link to="/about" className="hover:text-foreground">
            {t("layouts.user.footer.contact")}
          </Link>
          <Link to="/projects" className="hover:text-foreground">
            {t("layouts.user.footer.caseStudies")}
          </Link>
          <Link to="/glucose" className="hover:text-foreground">
            {t("layouts.user.footer.glucoseData")}
          </Link>
        </div>

        <p className="text-xs font-medium text-muted-foreground md:col-span-2">
          {t("layouts.user.footer.copyright", {
            year: new Date().getFullYear(),
          })}
        </p>
      </div>
    </footer>
  );
}
