import { useTranslation } from "react-i18next";
import { GridLoader, PuffLoader } from "react-spinners";
import useIsMobile from "@/app/hooks/useIsMobile.ts";

export function LoadingPage() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-1 flex-col justify-center items-center h-full gap-2.5 py-8 my-auto md:flex-row">
      {isMobile ? (
        <PuffLoader size={100} color={"var(--color-primary)"} />
      ) : (
        <GridLoader color={"var(--color-primary)"} />
      )}
      <div className="border border-border max-md:w-full md:h-16"></div>
      <div>
        <h1 className="text-2xl font-bold text-primary max-md:text-center">
          {t("pages.loading.title")}
        </h1>
        <h2 className="text-foreground max-md:text-center">
          {t("pages.loading.message")}
        </h2>
      </div>
    </div>
  );
}
