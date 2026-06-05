import { ArrowRightIcon, LockIcon, MailIcon } from "lucide-react";
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
import { isEmail } from "@/app/modules/Auth/utils/authValidation.ts";

export function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = {
      email: isEmail(email) ? "" : t("pages.auth.errors.email"),
      password: password ? "" : t("pages.auth.errors.passwordRequired"),
    };

    setErrors(nextErrors);

    if (nextErrors.email || nextErrors.password) {
      return;
    }

    setLoggedIn(true);
    navigate("/home");
  }

  return (
    <PageShell>
      <UserHeader
        title={t("pages.auth.login.title")}
        subtitle={t("pages.auth.login.subtitle")}
      />

      <Reveal>
        <AuthPanel
          eyebrow={t("pages.auth.login.eyebrow")}
          title={t("pages.auth.login.formTitle")}
          description={t("pages.auth.login.description")}
          footerLabel={t("pages.auth.login.noAccount")}
          footerAction={t("pages.auth.login.createAccount")}
          footerTo="/register"
        >
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <AuthTextField
              id="login-email"
              label={t("pages.auth.fields.email")}
              icon={<MailIcon className="size-4" />}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={errors.email}
              type="email"
              autoComplete="email"
              placeholder={t("pages.auth.placeholders.email")}
            />

            <AuthPasswordField
              id="login-password"
              label={t("pages.auth.fields.password")}
              icon={<LockIcon className="size-4" />}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={errors.password}
              autoComplete="current-password"
              placeholder={t("pages.auth.placeholders.password")}
              showLabel={t("pages.auth.actions.showPassword")}
              hideLabel={t("pages.auth.actions.hidePassword")}
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <input
                  type="checkbox"
                  className="size-4 rounded-control accent-primary"
                />
                {t("pages.auth.login.remember")}
              </label>
              <Link
                to="/reset-password"
                className="text-sm font-black text-foreground underline-offset-4 hover:underline"
              >
                {t("pages.auth.login.forgotPassword")}
              </Link>
            </div>

            <Button type="submit" variant="primary" className="w-full">
              {t("pages.auth.login.submit")}
              <ArrowRightIcon className="size-4" />
            </Button>

            <Notice>{t("pages.auth.login.demoNotice")}</Notice>
          </form>
        </AuthPanel>
      </Reveal>
    </PageShell>
  );
}
