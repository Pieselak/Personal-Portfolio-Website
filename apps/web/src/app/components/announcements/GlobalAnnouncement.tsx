import {
  AlertTriangleIcon,
  CheckCircleIcon,
  InfoIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useActiveAnnouncement } from "@/app/api/queries";

const variants = {
  INFO: "border-blue-border bg-blue-bg text-blue-text",
  SUCCESS: "border-green-border bg-green-bg text-green-text",
  WARNING: "border-yellow-border bg-yellow-bg text-yellow-text",
  CRITICAL: "border-red-border bg-red-bg text-red-text",
} as const;

export function GlobalAnnouncement() {
  const { i18n } = useTranslation();
  const [dismissedKey, setDismissedKey] = useState(() =>
    localStorage.getItem("dismissed-announcement"),
  );
  const query = useActiveAnnouncement(i18n.language);
  const item = query.data;
  if (!item || dismissedKey === item.uuid) return null;

  const Icon =
    item.variant === "SUCCESS"
      ? CheckCircleIcon
      : item.variant === "INFO"
        ? InfoIcon
        : AlertTriangleIcon;
  const isExternal = item.actionUrl?.startsWith("http");

  function dismiss() {
    if (!item) return;
    const key = item.uuid;
    localStorage.setItem("dismissed-announcement", key);
    setDismissedKey(key);
  }

  return (
    <div className="mx-auto mt-3 w-full max-w-6xl px-3 md:px-6">
      <aside
        className={`flex w-full flex-wrap items-start gap-3 rounded-tile border p-3 md:flex-nowrap md:p-4 ${variants[item.variant]}`}
        aria-live={item.variant === "CRITICAL" ? "assertive" : "polite"}
      >
        <Icon className="mt-0.5 size-5 shrink-0" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="font-black">{item.title}</p>
          <p className="text-sm leading-6">{item.content}</p>
        </div>
        {item.actionUrl && item.actionLabel && (
          <>
            {isExternal ? (
              <a
                href={item.actionUrl}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 rounded-control border border-current px-3 py-1 text-sm font-black"
              >
                {item.actionLabel}
              </a>
            ) : (
              <Link
                to={item.actionUrl}
                className="shrink-0 rounded-control border border-current px-3 py-1 text-sm font-black"
              >
                {item.actionLabel}
              </Link>
            )}
          </>
        )}
        {item.dismissible && (
          <button
            type="button"
            onClick={dismiss}
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-control border border-current"
            aria-label="Close"
          >
            <XIcon className="size-4" />
          </button>
        )}
      </aside>
    </div>
  );
}
