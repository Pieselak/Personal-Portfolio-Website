import {
  ArrowRight,
  ExternalLink,
  GitBranch,
  Mail,
  Sparkles,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";
import { ProfileImage } from "@/app/modules/User/Home/components/ProfileImage.tsx";

const profileLinks = [
  {
    key: "github",
    href: "https://github.com/Pieselak",
    label: "GitHub",
    icon: GitBranch,
  },
  {
    key: "linkedin",
    href: "https://www.linkedin.com/in/patryk-znamirowski",
    label: "LinkedIn",
    icon: ExternalLink,
  },
];

export function HomeHero() {
  const { t } = useTranslation();
  const techStack = ["React", "NestJS", "TailwindCSS"];

  return (
    <section className="grid min-h-[calc(100dvh-9rem)] w-full items-stretch gap-4 md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] md:gap-5">
      <BentoTile className="flex min-h-[31rem] flex-col justify-between overflow-hidden bg-surface p-5 md:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-control border border-border bg-surface-inset px-3 py-2 text-xs font-black uppercase text-muted-foreground">
            <Sparkles className="size-4" />
            {t("pages.user.home.hero.eyebrow")}
          </span>
          {techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-control border border-border bg-surface-raised px-3 py-2 text-xs font-bold text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="space-y-5 py-8 md:py-10">
          <p className="text-sm font-black uppercase text-muted-foreground">
            {t("pages.user.home.hero.name")}
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-[1.04] text-foreground md:text-6xl">
            {t("pages.user.home.hero.headline")}
          </h1>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
            {t("pages.user.home.hero.description")}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link
              to="/projects"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control border border-primary bg-primary px-4 text-sm font-black text-primary-foreground transition-colors duration-200 hover:bg-primary/90"
            >
              {t("pages.user.home.hero.primaryAction")}
              <ArrowRight className="size-4" />
            </Link>
            <a
              href="mailto:znamirowskipatryk@gmail.com"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control border border-border bg-surface-raised px-4 text-sm font-black text-foreground transition-colors duration-200 hover:border-ring hover:bg-surface-inset"
            >
              <Mail className="size-4" />
              {t("pages.user.home.hero.secondaryAction")}
            </a>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            {profileLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.key}
                  href={link.href}
                  target={link.key === "email" ? undefined : "_blank"}
                  rel={link.key === "email" ? undefined : "noreferrer"}
                  aria-label={t(`pages.user.home.links.${link.key}`)}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-control border border-border bg-surface-inset px-4 text-sm font-black text-muted-foreground transition-colors duration-200 hover:border-ring hover:text-foreground"
                >
                  <Icon className="size-4" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </BentoTile>

      <ProfileImage />
    </section>
  );
}
