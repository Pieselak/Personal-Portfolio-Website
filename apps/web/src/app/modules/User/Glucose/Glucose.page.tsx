import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import { PageShell } from "@/app/components/ui/PageShell.tsx";
import { Reveal } from "@/app/components/motion/Reveal.tsx";
import { UserHeader } from "@/app/layouts/User/Header/UserHeader.tsx";
import { GlucoseStatusHeader } from "@/app/modules/User/Glucose/components/GlucoseStatusHeader.tsx";
import {
  GlucoseSectionTabs,
  type GlucoseSection,
} from "@/app/modules/User/Glucose/components/GlucoseSectionTabs.tsx";
import { GlucoseChartPanel } from "@/app/modules/User/Glucose/components/GlucoseChartPanel.tsx";
import { TimeInRangePanel } from "@/app/modules/User/Glucose/components/TimeInRangePanel.tsx";
import { SummaryPanel } from "@/app/modules/User/Glucose/components/SummaryPanel.tsx";
import { TimeRangeSelector } from "@/app/modules/User/Glucose/components/TimeRangeSelector.tsx";
import type { GlucoseTimeRange } from "@/app/modules/User/Glucose/constants/glucoseTimeRanges.ts";

const GLUCOSE_SECTIONS: GlucoseSection[] = ["graph", "timeinrange", "summary"];

function getSection(value: string | null): GlucoseSection {
  return GLUCOSE_SECTIONS.find((section) => section === value) ?? "graph";
}

export function GlucosePage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSection = getSection(searchParams.get("section"));
  const [selectedRange, setSelectedRange] = useState<GlucoseTimeRange>("7d");

  useEffect(() => {
    if (searchParams.get("section") !== activeSection) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set("section", activeSection);
      setSearchParams(nextParams, { replace: true });
    }
  }, [activeSection, searchParams, setSearchParams]);

  function handleSectionChange(section: GlucoseSection) {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("section", section);
    setSearchParams(nextParams);
  }

  return (
    <PageShell>
      <UserHeader
        title={t("pages.user.glucose.title")}
        subtitle={t("pages.user.glucose.subtitle")}
      />

      <Reveal>
        <GlucoseStatusHeader />
      </Reveal>

      <div className="sticky top-3 z-20 grid w-full gap-3 lg:grid-cols-[1fr_auto] lg:items-start">
        <GlucoseSectionTabs
          value={activeSection}
          onChange={handleSectionChange}
        />
          <TimeRangeSelector
            value={selectedRange}
            onChange={setSelectedRange}
            includeAll
          />
      </div>

      <Reveal key={activeSection}>
        {activeSection === "graph" && (
          <GlucoseChartPanel selectedRange={selectedRange} />
        )}
        {activeSection === "timeinrange" && (
          <TimeInRangePanel selectedRange={selectedRange} />
        )}
        {activeSection === "summary" && (
          <SummaryPanel selectedRange={selectedRange} />
        )}
      </Reveal>
    </PageShell>
  );
}
