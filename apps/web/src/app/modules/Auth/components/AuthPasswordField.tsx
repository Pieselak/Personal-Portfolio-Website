import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IconButton } from "@/app/components/ui/IconButton.tsx";
import { AuthField } from "@/app/modules/Auth/components/AuthField.tsx";
import type { InputHTMLAttributes } from "react";

type AuthPasswordFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  error?: string;
};

export function AuthPasswordField(props: AuthPasswordFieldProps) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <AuthField
        {...props}
        type={isVisible ? "text" : "password"}
        className="pr-12"
      />
      <IconButton
        aria-label={t(
          isVisible
            ? "pages.auth.actions.hidePassword"
            : "pages.auth.actions.showPassword",
        )}
        icon={
          isVisible ? (
            <EyeOffIcon className="size-4.5" aria-hidden />
          ) : (
            <EyeIcon className="size-4.5" aria-hidden />
          )
        }
        onClick={() => setIsVisible((value) => !value)}
        className="absolute right-1.5 top-8 size-9 border-transparent bg-transparent"
      />
    </div>
  );
}
