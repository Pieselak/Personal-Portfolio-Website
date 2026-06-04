import { motion } from "framer-motion";
import { ActivitySquare, DatabaseZap, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card, SectionHeader } from "@/app/components/ui.tsx";

const principles = [
  { key: "clarity", icon: ActivitySquare },
  { key: "reliability", icon: ShieldCheck },
  { key: "data", icon: DatabaseZap },
];

export function AboutMePage() {
  const { t } = useTranslation();

  return (
    <motion.div
      className="w-full space-y-10"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeader
          eyebrow={t("pages.user.aboutme.eyebrow")}
          title={t("pages.user.aboutme.title")}
          description={t("pages.user.aboutme.subtitle")}
        />

        <Card className="p-6 md:p-8">
          <p className="text-3xl font-semibold tracking-[-0.01em] leading-tight text-foreground">
            {t("pages.user.aboutme.statement")}
          </p>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            {t("pages.user.aboutme.description")}
          </p>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {principles.map((principle) => {
          const Icon = principle.icon;

          return (
            <Card key={principle.key} className="p-5">
              <span className="flex size-10 items-center justify-center rounded-md border border-accent/35 bg-accent/10 text-accent">
                <Icon className="size-5" />
              </span>
              <p className="mt-6 text-2xl font-semibold text-foreground">
                {t(`pages.user.aboutme.principles.${principle.key}.title`)}
              </p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {t(`pages.user.aboutme.principles.${principle.key}.description`)}
              </p>
            </Card>
          );
        })}
      </section>

      <Card className="grid gap-6 p-6 md:grid-cols-[0.75fr_1.25fr] md:p-8">
        <div>
          <p className="text-xs font-medium text-accent">
            {t("pages.user.aboutme.focus.eyebrow")}
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.01em] text-foreground">
            {t("pages.user.aboutme.focus.title")}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {(t("pages.user.aboutme.focus.items", {
            returnObjects: true,
          }) as string[]).map((item) => (
            <div
              key={item}
              className="rounded-md border border-border bg-secondary/45 p-4 text-sm font-semibold text-foreground"
            >
              {item}
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
