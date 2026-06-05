import { ArrowRightIcon } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/app/components/ui/Button.tsx";
import { Notice } from "@/app/components/ui/Notice.tsx";
import { PageShell } from "@/app/components/ui/PageShell.tsx";
import { AuthField } from "@/app/modules/Auth/components/AuthField.tsx";
import { AuthFormPanel } from "@/app/modules/Auth/components/AuthFormPanel.tsx";
import { AuthPasswordField } from "@/app/modules/Auth/components/AuthPasswordField.tsx";
import { useLoginMutation } from "@/app/api/mutations";
import {
  getZodFieldErrors,
  loginSchema,
  type AuthFieldErrors,
  type LoginFormValues,
} from "@/app/modules/Auth/utils/authValidation.ts";
import { getAuthRequestError } from "@/app/modules/Auth/utils/authErrors.ts";

const initialValues: LoginFormValues = {
  identifier: "",
  password: "",
};

export function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();
  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<AuthFieldErrors<LoginFormValues>>({});
  const [requestError, setRequestError] = useState<string>();
  const isSubmitting = loginMutation.isPending;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRequestError(undefined);

    const errors = getZodFieldErrors(loginSchema, values, (code) =>
      t(`pages.auth.errors.${code}`),
    );
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      await loginMutation.mutateAsync(values);
      navigate("/home");
    } catch (error) {
      setRequestError(t(`pages.auth.errors.${getAuthRequestError(error)}`));
    }
  }

  return (
    <PageShell className="grid min-h-[calc(100dvh-11rem)] place-items-center">
      <AuthFormPanel
        eyebrow={t("pages.auth.login.eyebrow")}
        title={t("pages.auth.login.formTitle")}
      >
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {requestError && <Notice tone="red">{requestError}</Notice>}

          <AuthField
            id="login-identifier"
            label={t("pages.auth.fields.identifier")}
            placeholder={t("pages.auth.placeholders.identifier")}
            autoComplete="username"
            value={values.identifier}
            error={fieldErrors.identifier}
            disabled={isSubmitting}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                identifier: event.target.value,
              }))
            }
          />

          <AuthPasswordField
            id="login-password"
            label={t("pages.auth.fields.password")}
            placeholder={t("pages.auth.placeholders.password")}
            autoComplete="current-password"
            value={values.password}
            error={fieldErrors.password}
            disabled={isSubmitting}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
          />

          <div className="flex justify-end">
            <Link
              to="/reset-password"
              className="text-sm font-black text-muted-foreground transition-colors duration-200 hover:text-primary"
            >
              {t("pages.auth.login.forgotPassword")}
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting
              ? t("pages.auth.login.submitting")
              : t("pages.auth.login.submit")}
            <ArrowRightIcon className="size-4" aria-hidden />
          </Button>
        </form>

        <p className="mt-5 text-center text-sm font-bold text-muted-foreground">
          {t("pages.auth.login.noAccount")}{" "}
          <Link className="text-foreground hover:text-primary" to="/register">
            {t("pages.auth.login.createAccount")}
          </Link>
        </p>
      </AuthFormPanel>
    </PageShell>
  );
}
