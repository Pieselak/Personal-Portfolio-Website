import { AlertTriangle, LoaderCircle, RotateCcw, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getApiError } from "@/app/api/errors.ts";
import { Button } from "@/app/components/ui/Button.tsx";

type AdminErrorNoticeProps = {
  error: unknown;
  onRetry?: () => void;
  onDismiss?: () => void;
};

export function AdminErrorNotice({
  error,
  onRetry,
  onDismiss,
}: AdminErrorNoticeProps) {
  const { t } = useTranslation();
  const parsed = getApiError(error);

  return (
    <div
      className="flex flex-col gap-3 rounded-tile border border-red-border bg-red-bg p-4 text-red-text sm:flex-row sm:items-start"
      role="alert"
    >
      <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="font-black">{t("pages.admin.errors.title")}</p>
        <p className="mt-1 text-sm leading-6">
          {t(`pages.admin.errors.${parsed.kind}`)}
        </p>
        {parsed.detail ? (
          <p className="mt-1 break-words text-xs font-bold opacity-80">
            {parsed.detail}
          </p>
        ) : null}
      </div>
      <div className="flex shrink-0 gap-2">
        {onRetry ? (
          <Button onClick={onRetry}>
            <RotateCcw className="size-4" />
            {t("pages.admin.errors.retry")}
          </Button>
        ) : null}
        {onDismiss ? (
          <Button
            onClick={onDismiss}
            aria-label={t("pages.admin.errors.dismiss")}
          >
            <X className="size-4" />
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export function AdminLoadingState() {
  const { t } = useTranslation();

  return (
    <div
      className="flex min-h-28 items-center justify-center gap-3 rounded-tile border border-border bg-surface p-5 text-muted-foreground"
      role="status"
    >
      <LoaderCircle className="size-5 animate-spin" aria-hidden />
      <span className="text-sm font-bold">
        {t("pages.admin.errors.loading")}
      </span>
    </div>
  );
}
