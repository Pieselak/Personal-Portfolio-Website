import { SearchXIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { StatePanel } from "@/app/components/ui.tsx";

type NotFoundPageProps = {
  message?: string;
};

export function NotFoundPage({ message }: NotFoundPageProps) {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-2xl self-center">
      <SearchXIcon className="mx-auto mb-4 size-10 text-accent" />
      <StatePanel
        title={t("pages.notFound.title")}
        message={message ? message : t("pages.notFound.message")}
      />
    </div>
  );
}
