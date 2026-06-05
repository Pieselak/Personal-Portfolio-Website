import { ArrowRightIcon, KeyRoundIcon, MailIcon } from "lucide-react";
import { type FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Reveal } from "@/app/components/motion/Reveal.tsx";
import { Button } from "@/app/components/ui/Button.tsx";
import { Notice } from "@/app/components/ui/Notice.tsx";
import { PageShell } from "@/app/components/ui/PageShell.tsx";
import { UserHeader } from "@/app/layouts/User/Header/UserHeader.tsx";
import { AuthPanel } from "@/app/modules/Auth/components/AuthPanel.tsx";
import { AuthTextField } from "@/app/modules/Auth/components/AuthTextField.tsx";
import { isEmail } from "@/app/modules/Auth/utils/authValidation.ts";

export function ResetPasswordPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isEmail(email)) {
      setError(t("pages.auth.errors.email"));
      setEmailSent(false);
      return;
    }

    setError("");
    setEmailSent(true);
  }

  return (
    <PageShell>
      <UserHeader
        title={t("pages.auth.reset.title")}
        subtitle={t("pages.auth.reset.subtitle")}
      />

      <Reveal>
        <AuthPanel
          eyebrow={t("pages.auth.reset.eyebrow")}
          title={t("pages.auth.reset.formTitle")}
          description={t("pages.auth.reset.description")}
          footerLabel={t("pages.auth.reset.remembered")}
          footerAction={t("pages.auth.reset.backToLogin")}
          footerTo="/login"
        >
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <AuthTextField
              id="reset-email"
              label={t("pages.auth.fields.email")}
              icon={<MailIcon className="size-4" />}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={error}
              type="email"
              autoComplete="email"
              placeholder={t("pages.auth.placeholders.email")}
            />

            <Button type="submit" variant="primary" className="w-full">
              {t("pages.auth.reset.submit")}
              <ArrowRightIcon className="size-4" />
            </Button>

            {emailSent ? (
              <Notice tone="green" title={t("pages.auth.reset.sentTitle")}>
                {t("pages.auth.reset.sentMessage")}
              </Notice>
            ) : (
              <div className="rounded-tile border border-border bg-surface-inset p-4">
                <KeyRoundIcon className="mb-3 size-5 text-muted-foreground" />
                <p className="text-sm font-semibold leading-6 text-muted-foreground">
                  {t("pages.auth.reset.hint")}
                </p>
              </div>
            )}

            <Link
              to="/register"
              className="inline-flex text-sm font-black text-foreground underline-offset-4 hover:underline"
            >
              {t("pages.auth.reset.createAccount")}
            </Link>
          </form>
        </AuthPanel>
      </Reveal>
    </PageShell>
  );
}
