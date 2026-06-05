import { MailIcon } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/app/components/ui/Button.tsx";
import { Notice } from "@/app/components/ui/Notice.tsx";
import { PageShell } from "@/app/components/ui/PageShell.tsx";
import { AuthField } from "@/app/modules/Auth/components/AuthField.tsx";
import { AuthFormPanel } from "@/app/modules/Auth/components/AuthFormPanel.tsx";
import {
  getZodFieldErrors,
  resetPasswordSchema,
  type AuthFieldErrors,
  type ResetPasswordFormValues,
} from "@/app/modules/Auth/utils/authValidation.ts";

const initialValues: ResetPasswordFormValues = {
  email: "",
};

export function ResetPasswordPage() {
  const { t } = useTranslation();
  const [values, setValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] =
    useState<AuthFieldErrors<ResetPasswordFormValues>>({});
  const [isSent, setIsSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const errors = getZodFieldErrors(resetPasswordSchema, values, (code) =>
      t(`pages.auth.errors.${code}`),
    );
    setFieldErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSent(true);
    }
  }

  return (
    <PageShell className="grid min-h-[calc(100dvh-11rem)] place-items-center">
      <AuthFormPanel
        eyebrow={t("pages.auth.reset.eyebrow")}
        title={t("pages.auth.reset.formTitle")}
      >
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {isSent && (
            <Notice tone="green" title={t("pages.auth.reset.sentTitle")}>
              {t("pages.auth.reset.sentMessage")}
            </Notice>
          )}

          <AuthField
            id="reset-email"
            label={t("pages.auth.fields.email")}
            placeholder={t("pages.auth.placeholders.email")}
            autoComplete="email"
            inputMode="email"
            value={values.email}
            error={fieldErrors.email}
            onChange={(event) =>
              setValues({
                email: event.target.value,
              })
            }
          />

          <Button type="submit" variant="primary" className="w-full">
            {t("pages.auth.reset.submit")}
            <MailIcon className="size-4" aria-hidden />
          </Button>
        </form>

        <p className="mt-5 text-center text-sm font-bold text-muted-foreground">
          {t("pages.auth.reset.remembered")}{" "}
          <Link className="text-foreground hover:text-primary" to="/login">
            {t("pages.auth.reset.backToLogin")}
          </Link>
        </p>
      </AuthFormPanel>
    </PageShell>
  );
}
