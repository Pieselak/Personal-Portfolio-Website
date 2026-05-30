import { PuffLoader } from "react-spinners";
import { useTranslation } from "react-i18next";

export function LoadingPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center self-center gap-5">
      <PuffLoader size="100px" color="var(--primary)" />
      <h1 className="text-primary font-bold text-2xl">
        {t("pages.loading.message")}
      </h1>
    </div>
  );
}
