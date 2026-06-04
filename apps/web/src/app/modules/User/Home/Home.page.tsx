import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  ActivitySquare,
  ArrowRight,
  ChartNoAxesCombined,
  FoldersIcon,
  ShieldCheck,
  UserIcon,
} from "lucide-react";
import { Badge, Card, SectionHeader } from "@/app/components/ui.tsx";

const capabilities = [
  { key: "cleanInterfaces", icon: ActivitySquare },
  { key: "dataVisualization", icon: ChartNoAxesCombined },
  { key: "secureArchitecture", icon: ShieldCheck },
];

const sections = [
  { icon: UserIcon, key: "aboutme", link: "/about" },
  { icon: FoldersIcon, key: "projects", link: "/projects" },
  { icon: ActivitySquare, key: "glucose", link: "/glucose" },
];

export function HomePage() {
  const { t } = useTranslation();

  return (
    <motion.div
      className="w-full space-y-12"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <section className="grid min-h-[calc(100dvh-13rem)] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <SectionHeader
            eyebrow={t("pages.user.home.eyebrow")}
            title={t("pages.user.home.title")}
            description={t("pages.user.home.subtitle")}
          />

          <div className="flex flex-wrap gap-3">
            <Link
              to="/glucose"
              className="inline-flex min-h-10 items-center gap-2 rounded-md border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t("pages.user.home.primaryCta")}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex min-h-10 items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-ring hover:bg-secondary"
            >
              {t("pages.user.home.secondaryCta")}
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {(t("pages.user.home.proofPoints", {
              returnObjects: true,
            }) as string[]).map((point) => (
              <Card key={point} className="p-4">
                <p className="text-xs font-medium text-muted-foreground">
                  {point}
                </p>
              </Card>
            ))}
          </div>
        </div>

        <Card className="overflow-hidden p-6">
          <div className="border-b border-border pb-5">
            <Badge tone="accent">{t("pages.user.home.panel.badge")}</Badge>
            <p className="mt-5 text-3xl font-semibold tracking-[-0.01em] text-foreground">
              {t("pages.user.home.panel.title")}
            </p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {t("pages.user.home.panel.description")}
            </p>
          </div>

          <div className="mt-6 grid gap-4">
            {capabilities.map((capability) => {
              const Icon = capability.icon;
              return (
                <div
                  key={capability.key}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 rounded-md border border-border bg-secondary/45 p-4"
                >
                  <span className="flex size-10 items-center justify-center rounded-md border border-accent/35 bg-accent/10 text-accent">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">
                      {t(`pages.user.home.capabilities.${capability.key}.title`)}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {t(
                        `pages.user.home.capabilities.${capability.key}.description`,
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon;

          return (
            <Link key={section.link} to={section.link} className="group">
              <Card className="h-full p-5 transition-[border-color,transform] duration-200 group-hover:-translate-y-1 group-hover:border-ring">
                <div className="mb-8 flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground">
                    <Icon className="size-5" />
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                </div>
                <p className="text-2xl font-semibold text-foreground">
                  {t(`pages.user.${section.key}.title`)}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {t(`pages.user.home.sections.${section.key}.description`)}
                </p>
              </Card>
            </Link>
          );
        })}
      </section>
    </motion.div>
  );
}
