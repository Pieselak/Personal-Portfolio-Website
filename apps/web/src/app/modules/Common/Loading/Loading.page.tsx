import { PuffLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
import { Card } from "@/app/components/ui.tsx";

export function LoadingPage() {
  const { t } = useTranslation();

  return (
    <Card className="flex flex-col items-center justify-center gap-5 self-center p-10">
      <PuffLoader size="72px" color="var(--accent)" />
      <h1 className="max-w-md text-center text-2xl font-semibold text-foreground">
        {t("pages.loading.message")}
      </h1>
    </Card>
  );
}
