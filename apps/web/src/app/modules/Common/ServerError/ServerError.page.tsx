import { ServerCrashIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ServerErrorPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-1 flex-col justify-center items-center h-full gap-2.5 py-8 my-auto md:flex-row">
      <ServerCrashIcon className="text-primary size-16 max-md:size-25" />
      <div className="border border-border max-md:w-full md:h-16"></div>
      <div>
        <h1 className="text-2xl font-bold text-primary max-md:text-center">
          {t("pages.serverError.title")}
        </h1>
        <h2 className="text-foreground max-md:text-center">
          {t("pages.serverError.message")}
        </h2>
      </div>
    </div>
  );
}
