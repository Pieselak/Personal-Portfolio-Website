import {
  useGlucoseCurrent,
  useGlucoseSensor,
} from "@/app/api/queries/useGlucose.ts";
import {
  GlucoseErrorState,
  GlucoseLoadingState,
} from "@/app/modules/User/Glucose/GlucoseStates.tsx";
import { CurrentGlucoseTile } from "@/app/modules/User/Glucose/components/CurrentGlucoseTile.tsx";
import { SensorStatusTile } from "@/app/modules/User/Glucose/components/SensorStatusTile.tsx";
import { useTranslation } from "react-i18next";

export function GlucoseStatusHeader() {
  const { t } = useTranslation();
  const currentQuery = useGlucoseCurrent();
  const sensorQuery = useGlucoseSensor();

  if (currentQuery.isLoading) return <GlucoseLoadingState />;

  if (currentQuery.isError || !currentQuery.data) {
    return (
      <GlucoseErrorState message={t("pages.user.glucose.errors.current")} />
    );
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(280px,0.8fr)_1.2fr]">
      <CurrentGlucoseTile current={currentQuery.data} />
      <SensorStatusTile sensor={sensorQuery.data} />
    </section>
  );
}
