import { ArrowRightIcon, LockIcon, MailIcon, UserRoundIcon } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Reveal } from "@/app/components/motion/Reveal.tsx";
import { Button } from "@/app/components/ui/Button.tsx";
import { Notice } from "@/app/components/ui/Notice.tsx";
import { PageShell } from "@/app/components/ui/PageShell.tsx";
import { UserHeader } from "@/app/layouts/User/Header/UserHeader.tsx";
import { useAuthStore } from "@/app/modules/Auth/authStore.ts";
import { AuthPanel } from "@/app/modules/Auth/components/AuthPanel.tsx";
import { AuthPasswordField } from "@/app/modules/Auth/components/AuthPasswordField.tsx";
import { AuthTextField } from "@/app/modules/Auth/components/AuthTextField.tsx";
import {
  isEmail,
  isStrongPassword,
} from "@/app/modules/Auth/utils/authValidation.ts";

export function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = {
      name: name.trim() ? "" : t("pages.auth.errors.name"),
      email: isEmail(email) ? "" : t("pages.auth.errors.email"),
      password: isStrongPassword(password)
        ? ""
        : t("pages.auth.errors.passwordLength"),
      confirmPassword:
        password && password === confirmPassword
          ? ""
          : t("pages.auth.errors.passwordMatch"),
      terms: acceptTerms ? "" : t("pages.auth.errors.terms"),
    };

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    setLoggedIn(true);
    navigate("/home");
  }

  return (
    <PageShell>
      <UserHeader
        title={t("pages.auth.register.title")}
        subtitle={t("pages.auth.register.subtitle")}
      />

      <Reveal>
        <AuthPanel
          eyebrow={t("pages.auth.register.eyebrow")}
          title={t("pages.auth.register.formTitle")}
          description={t("pages.auth.register.description")}
          footerLabel={t("pages.auth.register.hasAccount")}
          footerAction={t("pages.auth.register.signIn")}
          footerTo="/login"
        >
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <AuthTextField
              id="register-name"
              label={t("pages.auth.fields.name")}
              icon={<UserRoundIcon className="size-4" />}
              value={name}
              onChange={(event) => setName(event.target.value)}
              error={errors.name}
              autoComplete="name"
              placeholder={t("pages.auth.placeholders.name")}
            />

            <AuthTextField
              id="register-email"
              label={t("pages.auth.fields.email")}
              icon={<MailIcon className="size-4" />}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={errors.email}
              type="email"
              autoComplete="email"
              placeholder={t("pages.auth.placeholders.email")}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <AuthPasswordField
                id="register-password"
                label={t("pages.auth.fields.password")}
                icon={<LockIcon className="size-4" />}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                error={errors.password}
                autoComplete="new-password"
                placeholder={t("pages.auth.placeholders.password")}
                showLabel={t("pages.auth.actions.showPassword")}
                hideLabel={t("pages.auth.actions.hidePassword")}
              />

              <AuthPasswordField
                id="register-confirm-password"
                label={t("pages.auth.fields.confirmPassword")}
                icon={<LockIcon className="size-4" />}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                error={errors.confirmPassword}
                autoComplete="new-password"
                placeholder={t("pages.auth.placeholders.confirmPassword")}
                showLabel={t("pages.auth.actions.showPassword")}
                hideLabel={t("pages.auth.actions.hidePassword")}
              />
            </div>

            <div className="space-y-2">
              <label className="flex gap-3 rounded-tile border border-border bg-surface-inset p-3 text-sm font-semibold leading-6 text-muted-foreground">
                <input
                  type="checkbox"
                  className="mt-1 size-4 shrink-0 rounded-control accent-primary"
                  checked={acceptTerms}
                  onChange={(event) => setAcceptTerms(event.target.checked)}
                />
                <span>
                  {t("pages.auth.register.accept")}{" "}
                  <Link
                    to="/terms"
                    className="font-black text-foreground underline-offset-4 hover:underline"
                  >
                    {t("pages.auth.register.terms")}
                  </Link>
                  .
                </span>
              </label>
              {errors.terms && (
                <p className="text-sm font-semibold text-destructive">
                  {errors.terms}
                </p>
              )}
            </div>

            <Button type="submit" variant="primary" className="w-full">
              {t("pages.auth.register.submit")}
              <ArrowRightIcon className="size-4" />
            </Button>

            <Notice>{t("pages.auth.register.demoNotice")}</Notice>
          </form>
        </AuthPanel>
      </Reveal>
    </PageShell>
  );
}
