import { GhostIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

type NotFoundPageProps = {
  message?: string;
};

export function NotFoundPage({ message }: NotFoundPageProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center gap-2.5 my-auto md:flex-row">
      <GhostIcon className="text-primary size-16 max-md:size-25" />
      <div className="border border-border max-md:w-full md:h-16"></div>
      <div>
        <h1 className="text-2xl font-bold text-primary max-md:text-center">
          {t("pages.notFound.title")}
        </h1>
        <h2 className="text-foreground max-md:text-center">
          {message ? message : t("pages.notFound.message")}
        </h2>
      </div>
    </div>
  );
}
