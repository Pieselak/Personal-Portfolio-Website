import {
  BellRingIcon,
  BookOpenCheckIcon,
  FolderKanbanIcon,
  GaugeIcon,
  LogOutIcon,
  SettingsIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/app/api/mutations";
import { usePermissions } from "@/app/auth/permissions.ts";
import { ThemeToggle } from "@/app/components/theme/ThemeToggle.tsx";

const adminItems = [
  { to: "/admin", key: "dashboard", icon: GaugeIcon, permission: null },
  {
    to: "/admin/game",
    key: "game",
    icon: BookOpenCheckIcon,
    permission: "game.content:read",
  },
  {
    to: "/admin/projects",
    key: "projects",
    icon: FolderKanbanIcon,
    permission: "projects:read",
  },
  {
    to: "/admin/announcements",
    key: "announcements",
    icon: BellRingIcon,
    permission: "announcements:read",
  },
  {
    to: "/admin/settings",
    key: "settings",
    icon: SettingsIcon,
    permission: "game.settings:read",
  },
  {
    to: "/admin/users",
    key: "users",
    icon: UsersIcon,
    permission: "users:read",
  },
  {
    to: "/admin/roles",
    key: "roles",
    icon: ShieldCheckIcon,
    permission: "roles:read",
  },
] as const;

export function AdminLayout() {
  const { t } = useTranslation();
  const { has } = usePermissions();
  const logout = useLogoutMutation();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout.mutateAsync();
    navigate("/home");
  }

  return (
    <div className="min-h-dvh bg-surface-inset text-foreground lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="border-b border-border bg-surface p-3 lg:sticky lg:top-0 lg:h-dvh lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-3 rounded-tile border border-border-strong bg-background p-3 text-foreground">
          <Link to="/admin" className="font-black tracking-tight">
            {t("pages.admin.brand")}
          </Link>
          <ThemeToggle className="bg-surface" />
        </div>
        <nav className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
          {adminItems
            .filter((item) => !item.permission || has(item.permission))
            .map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/admin"}
                className={({ isActive }) =>
                  `flex min-h-11 items-center gap-2 rounded-control border px-3 text-sm font-bold transition-colors ${
                    isActive
                      ? "border-border-strong bg-surface-inset text-primary"
                      : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                  }`
                }
              >
                <item.icon className="size-4.5" aria-hidden />
                {t(`pages.admin.nav.${item.key}`)}
              </NavLink>
            ))}
        </nav>
        <div className="mt-3 grid gap-2 border-t border-border pt-3">
          <Link
            to="/home"
            className="rounded-control border border-border px-3 py-2 text-center text-sm font-bold"
          >
            {t("pages.admin.backToSite")}
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex min-h-10 items-center justify-center gap-2 rounded-control border border-border text-sm font-bold"
          >
            <LogOutIcon className="size-4" />
            {t("layouts.user.nav.account.logout")}
          </button>
        </div>
      </aside>
      <main className="min-w-0 p-3 md:p-6">
        <div className="mx-auto w-full max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
