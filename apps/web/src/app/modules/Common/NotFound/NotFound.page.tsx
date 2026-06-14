import { GhostIcon, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

type NotFoundPageProps = {
  message?: string;
};

export function NotFoundPage({ message }: NotFoundPageProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-1 flex-col justify-center items-center h-full p-2.5 gap-2.5 my-auto">
      <div className="flex flex-col justify-center items-center gap-2.5 md:flex-row">
        <GhostIcon className="text-primary size-16 max-md:size-25" />
        <div className="border border-border max-md:w-full md:h-16"></div>
        <div>
          <h1 className="text-2xl font-bold text-primary max-md:text-center">
            {t("pages.notFound.title")}
          </h1>
          <h2 className="text-foreground max-md:text-center">
            {message ?? t("pages.notFound.message")}
          </h2>
        </div>
      </div>
      <div className="flex gap-2.5">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 rounded-control border border-border bg-surface px-3 py-2 text-sm font-bold text-muted-foreground transition-[border-color,color,background-color] duration-200 hover:border-ring hover:bg-surface-raised hover:text-foreground"
        >
          <Home className="size-4" />
          {t("pages.notFound.returnHome")}
        </Link>
      </div>
    </div>
  );
}
