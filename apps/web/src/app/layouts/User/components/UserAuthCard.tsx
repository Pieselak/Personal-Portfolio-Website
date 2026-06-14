import {
  ChevronDownIcon,
  LogInIcon,
  LogOutIcon,
  SettingsIcon,
  ShieldCogIcon,
  UserCircleIcon,
  UserRoundIcon,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/app/api/mutations";
import { useAuthStore } from "@/app/modules/Auth/authStore.ts";
import { ADMIN_PERMISSIONS } from "@/app/auth/permissions.ts";

type UserAuthCardProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

export function UserAuthCard({
  mobile = false,
  onNavigate,
}: UserAuthCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logoutMutation = useLogoutMutation();
  const [isOpen, setIsOpen] = useState(false);
  const canAccessAdmin = ADMIN_PERMISSIONS.some((permission) =>
    user?.role.permissions.includes(permission),
  );

  async function handleLogout() {
    await logoutMutation.mutateAsync();
    setIsOpen(false);
    onNavigate?.();
    navigate("/home");
  }

  if (!isLoggedIn || !user) {
    return (
      <Link
        to="/login"
        onClick={onNavigate}
        className={`inline-flex items-center justify-center gap-2 rounded-control border border-border bg-surface-raised px-3 text-sm font-black text-foreground transition-[background-color,border-color,color] duration-200 hover:border-ring hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
          mobile ? "min-h-12 w-full" : "min-h-10"
        }`}
      >
        <LogInIcon className="size-4.5 shrink-0" aria-hidden />
        <span>{t("layouts.user.nav.account.login")}</span>
      </Link>
    );
  }

  return (
    <div className={`relative ${mobile ? "w-full" : ""}`}>
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className={`flex items-center gap-2 rounded-tile border border-border bg-surface p-1.5 text-left transition-[background-color,border-color] duration-200 hover:border-ring hover:bg-surface-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
          mobile ? "w-full" : "max-w-[18rem]"
        }`}
        aria-expanded={isOpen}
        aria-label={t("layouts.user.nav.account.expand")}
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-control border border-border-strong bg-surface-raised text-primary">
          <UserRoundIcon className="size-4.5" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-black text-foreground">
            {user.username}
          </span>
          <span className="flex items-center gap-1 truncate text-[0.72rem] font-bold text-muted-foreground">
            {t(`roles.${user.role.label}`) || user.role.code}
          </span>
        </span>
        <ChevronDownIcon
          className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      {isOpen && (
        <div
          className={`z-50 rounded-tile border border-border bg-surface p-1.5 ${
            mobile
              ? "mt-2 w-full"
              : "absolute right-0 top-[calc(100%+0.5rem)] w-56 shadow-tile"
          }`}
        >
          <Link
            to="/profile"
            onClick={() => {
              setIsOpen(false);
              onNavigate?.();
            }}
            className="flex min-h-10 items-center gap-2 rounded-control px-3 text-sm font-bold text-muted-foreground transition-[background-color,color] duration-200 hover:bg-surface-raised hover:text-primary"
          >
            <UserCircleIcon className="size-4.5" aria-hidden />
            {t("layouts.user.nav.account.profile")}
          </Link>
          <Link
            to="/settings"
            onClick={() => {
              setIsOpen(false);
              onNavigate?.();
            }}
            className="flex min-h-10 items-center gap-2 rounded-control px-3 text-sm font-bold text-muted-foreground transition-[background-color,color] duration-200 hover:bg-surface-raised hover:text-primary"
          >
            <SettingsIcon className="size-4.5" aria-hidden />
            {t("layouts.user.nav.account.settings")}
          </Link>
          {canAccessAdmin && (
            <Link
              to="/admin"
              onClick={() => {
                setIsOpen(false);
                onNavigate?.();
              }}
              className="flex min-h-10 items-center gap-2 rounded-control px-3 text-sm font-bold text-muted-foreground transition-[background-color,color] duration-200 hover:bg-surface-raised hover:text-primary"
            >
              <ShieldCogIcon className="size-4.5" aria-hidden />
              {t("layouts.user.nav.account.admin")}
            </Link>
          )}
          <button
            type="button"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="flex min-h-10 w-full items-center gap-2 rounded-control px-3 text-left text-sm font-bold text-muted-foreground transition-[background-color,color] duration-200 hover:bg-surface-raised hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOutIcon className="size-4.5" aria-hidden />
            {t("layouts.user.nav.account.logout")}
          </button>
        </div>
      )}
    </div>
  );
}
