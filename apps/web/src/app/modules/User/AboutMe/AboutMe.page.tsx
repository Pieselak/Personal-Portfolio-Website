import { useTranslation } from "react-i18next";
import { Reveal } from "@/app/components/motion/Reveal.tsx";
import { PageShell } from "@/app/components/ui/PageShell.tsx";
import { UserHeader } from "@/app/layouts/User/Header/UserHeader.tsx";
import { AboutExperiencePanel } from "@/app/modules/User/AboutMe/components/AboutExperiencePanel.tsx";
import { AboutStoryPanel } from "@/app/modules/User/AboutMe/components/AboutStoryPanel.tsx";
import { AboutStrengthsGrid } from "@/app/modules/User/AboutMe/components/AboutStrengthsGrid.tsx";
import { AboutTechPanel } from "@/app/modules/User/AboutMe/components/AboutTechPanel.tsx";

export function AboutMePage() {
  const { t } = useTranslation();

  return (
    <PageShell>
      <UserHeader
        title={t("pages.user.aboutme.title")}
        subtitle={t("pages.user.aboutme.subtitle")}
      />

      <Reveal>
        <AboutStoryPanel />
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <Reveal>
          <AboutExperiencePanel />
        </Reveal>
        <Reveal>
          <AboutTechPanel />
        </Reveal>
      </div>

      <Reveal>
        <AboutStrengthsGrid />
      </Reveal>
    </PageShell>
  );
}
