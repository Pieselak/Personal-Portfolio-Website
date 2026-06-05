import { AlertCircle, LoaderCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export function GlucoseLoadingState() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-40 items-center justify-center rounded-tile border border-border bg-surface-inset p-6 font-bold text-muted-foreground">
      <LoaderCircle className="mr-2 size-5 animate-spin" />
      {t("pages.user.glucose.loading")}
    </div>
  );
}

type GlucoseMessageStateProps = {
  message: string;
};

export function GlucoseMessageState({ message }: GlucoseMessageStateProps) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-tile border border-dashed border-border bg-surface-inset p-6 text-center font-bold text-muted-foreground">
      {message}
    </div>
  );
}

export function GlucoseErrorState({ message }: GlucoseMessageStateProps) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-tile border border-red-border bg-red-bg p-6 text-center font-bold text-red-text">
      <AlertCircle className="mr-2 size-5 shrink-0" />
      {message}
    </div>
  );
}
