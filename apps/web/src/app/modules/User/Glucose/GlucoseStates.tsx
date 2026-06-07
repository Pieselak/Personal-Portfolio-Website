import {
  Activity,
  AlertCircle,
  Cable,
  LoaderCircle,
  Power,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";
import { getToneClasses, type Tone } from "@/app/components/ui/tone.ts";

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

type GlucoseAvailabilityStateVariant =
  | "disabled"
  | "noProvider"
  | "initializing"
  | "unavailable";

type GlucoseAvailabilityStateProps = {
  title: string;
  message: string;
  variant: GlucoseAvailabilityStateVariant;
};

const availabilityVariants: Record<
  GlucoseAvailabilityStateVariant,
  {
    icon: LucideIcon;
    tone: Tone;
  }
> = {
  disabled: {
    icon: Power,
    tone: "gray",
  },
  noProvider: {
    icon: Cable,
    tone: "orange",
  },
  initializing: {
    icon: Activity,
    tone: "yellow",
  },
  unavailable: {
    icon: WifiOff,
    tone: "red",
  },
};

export function GlucoseAvailabilityState({
  title,
  message,
  variant,
}: GlucoseAvailabilityStateProps) {
  const { t } = useTranslation();
  const config = availabilityVariants[variant];
  const Icon = config.icon;
  const toneClasses = getToneClasses(config.tone);

  return (
    <BentoTile
      eyebrow={t("pages.user.glucose.availability.eyebrow")}
      title={title}
      description={message}
      action={
        <span
          className={`flex size-10 items-center justify-center rounded-control border ${toneClasses.bg} ${toneClasses.border} ${toneClasses.text}`}
          aria-hidden="true"
        >
          <Icon className="size-5" />
        </span>
      }
    />
  );
}
