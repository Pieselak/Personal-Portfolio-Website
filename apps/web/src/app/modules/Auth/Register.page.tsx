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
import { useRegisterMutation } from "@/app/api/mutations";
import {
  getZodFieldErrors,
  registerSchema,
  type AuthFieldErrors,
  type RegisterFormValues,
} from "@/app/modules/Auth/utils/authValidation.ts";
import { getAuthRequestError } from "@/app/modules/Auth/utils/authErrors.ts";

const initialValues: RegisterFormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};

export function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();
  const [values, setValues] = useState<RegisterFormValues>(initialValues);
  const [fieldErrors, setFieldErrors] =
    useState<AuthFieldErrors<RegisterFormValues>>({});
  const [requestError, setRequestError] = useState<string>();
  const isSubmitting = registerMutation.isPending;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRequestError(undefined);

    const errors = getZodFieldErrors(registerSchema, values, (code) =>
      t(`pages.auth.errors.${code}`),
    );
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      await registerMutation.mutateAsync({
        username: values.username,
        email: values.email,
        password: values.password,
      });
      navigate("/home");
    } catch (error) {
      setRequestError(t(`pages.auth.errors.${getAuthRequestError(error)}`));
    }
  }

  return (
    <PageShell className="grid min-h-[calc(100dvh-11rem)] place-items-center">
      <AuthFormPanel
        eyebrow={t("pages.auth.register.eyebrow")}
        title={t("pages.auth.register.formTitle")}
      >
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {requestError && <Notice tone="red">{requestError}</Notice>}

          <AuthField
            id="register-username"
            label={t("pages.auth.fields.username")}
            placeholder={t("pages.auth.placeholders.username")}
            autoComplete="username"
            value={values.username}
            error={fieldErrors.username}
            disabled={isSubmitting}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                username: event.target.value,
              }))
            }
          />

          <AuthField
            id="register-email"
            label={t("pages.auth.fields.email")}
            placeholder={t("pages.auth.placeholders.email")}
            autoComplete="email"
            inputMode="email"
            value={values.email}
            error={fieldErrors.email}
            disabled={isSubmitting}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                email: event.target.value,
              }))
            }
          />

          <AuthPasswordField
            id="register-password"
            label={t("pages.auth.fields.password")}
            placeholder={t("pages.auth.placeholders.password")}
            autoComplete="new-password"
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

          <AuthPasswordField
            id="register-confirm-password"
            label={t("pages.auth.fields.confirmPassword")}
            placeholder={t("pages.auth.placeholders.confirmPassword")}
            autoComplete="new-password"
            value={values.confirmPassword}
            error={fieldErrors.confirmPassword}
            disabled={isSubmitting}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                confirmPassword: event.target.value,
              }))
            }
          />

          <label className="flex items-start gap-3 rounded-control border border-border bg-surface-inset p-3 text-sm font-bold text-muted-foreground">
            <input
              type="checkbox"
              checked={values.acceptTerms}
              disabled={isSubmitting}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  acceptTerms: event.target.checked,
                }))
              }
              className="mt-0.5 size-4 accent-primary"
            />
            <span>
              {t("pages.auth.register.accept")}{" "}
              <Link className="text-foreground hover:text-primary" to="/terms">
                {t("pages.auth.register.terms")}
              </Link>
              {fieldErrors.acceptTerms && (
                <span className="mt-1 block text-xs text-destructive">
                  {fieldErrors.acceptTerms}
                </span>
              )}
            </span>
          </label>

          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting
              ? t("pages.auth.register.submitting")
              : t("pages.auth.register.submit")}
            <ArrowRightIcon className="size-4" aria-hidden />
          </Button>
        </form>

        <p className="mt-5 text-center text-sm font-bold text-muted-foreground">
          {t("pages.auth.register.hasAccount")}{" "}
          <Link className="text-foreground hover:text-primary" to="/login">
            {t("pages.auth.register.signIn")}
          </Link>
        </p>
      </AuthFormPanel>
    </PageShell>
  );
}
