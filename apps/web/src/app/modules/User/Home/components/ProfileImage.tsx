import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";

const FALLBACK_PROFILE_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Bielsko-Bia%C5%82a_Plac_Teatralny_002.JPG";

export function ProfileImage() {
  const { t } = useTranslation();
  const [imageSrc, setImageSrc] = useState("/patryk_profile.png");

  return (
    <BentoTile className="flex min-h-[31rem] flex-col overflow-hidden p-0">
      <div className="relative min-h-0 flex-1 overflow-hidden border-b border-border bg-surface-inset">
        <img
          src={imageSrc}
          alt={t("pages.user.home.hero.imageAlt")}
          className="size-full object-cover grayscale transition-[filter,transform] duration-500 hover:scale-[1.02] hover:grayscale-0"
          onError={() => setImageSrc(FALLBACK_PROFILE_IMAGE)}
        />
      </div>
      <div className="grid gap-2 p-5">
        <p className="text-xs font-black uppercase text-muted-foreground">
          {t("pages.user.home.profileCard.eyebrow")}
        </p>
        <p className="text-2xl font-black text-foreground">
          {t("pages.user.home.profileCard.title")}
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          {t("pages.user.home.profileCard.description")}
        </p>
      </div>
    </BentoTile>
  );
}
