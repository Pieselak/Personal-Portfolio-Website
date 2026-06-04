import { useTranslation } from "react-i18next";
import { StatePanel } from "@/app/components/ui.tsx";

export function GlucoseLoadingState() {
  const { t } = useTranslation();

  return (
    <StatePanel tone="loading" message={t("pages.user.glucose.loading")} />
  );
}

type GlucoseMessageStateProps = {
  message: string;
};

export function GlucoseMessageState({ message }: GlucoseMessageStateProps) {
  return <StatePanel message={message} />;
}

export function GlucoseErrorState({ message }: GlucoseMessageStateProps) {
  return <StatePanel tone="error" message={message} />;
}
