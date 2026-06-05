import { useTranslation } from "react-i18next";
import { PageShell } from "@/app/components/ui/PageShell.tsx";
import { Reveal } from "@/app/components/motion/Reveal.tsx";
import { HomeFocusGrid } from "@/app/modules/User/Home/components/HomeFocusGrid.tsx";
import { HomeHero } from "@/app/modules/User/Home/components/HomeHero.tsx";
import { HomeMetricGrid } from "@/app/modules/User/Home/components/HomeMetricGrid.tsx";

export function HomePage() {
  const { t } = useTranslation();

  return (
    <PageShell className="space-y-5 md:space-y-6">
      <HomeHero />

      <Reveal>
        <HomeMetricGrid />
      </Reveal>

      <Reveal>
        <HomeFocusGrid
          title={t("pages.user.home.focus.title")}
          description={t("pages.user.home.focus.description")}
        />
      </Reveal>
    </PageShell>
  );
}
