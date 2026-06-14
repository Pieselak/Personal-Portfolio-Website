import {
  BellRingIcon,
  BookOpenCheckIcon,
  FolderKanbanIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { usePermissions } from "@/app/auth/permissions.ts";
import { AdminShell } from "@/app/modules/Admin/AdminShell.tsx";

const cards = [
  {
    to: "/admin/game",
    key: "game",
    permission: "game.content:read",
    icon: BookOpenCheckIcon,
  },
  {
    to: "/admin/projects",
    key: "projects",
    permission: "projects:read",
    icon: FolderKanbanIcon,
  },
  {
    to: "/admin/announcements",
    key: "announcements",
    permission: "announcements:read",
    icon: BellRingIcon,
  },
  {
    to: "/admin/roles",
    key: "roles",
    permission: "roles:read",
    icon: ShieldCheckIcon,
  },
] as const;

export function AdminDashboardPage() {
  const { t } = useTranslation();
  const { has } = usePermissions();
  return (
    <AdminShell
      title={t("pages.admin.dashboard.title")}
      description={t("pages.admin.dashboard.description")}
    >
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards
          .filter((card) => has(card.permission))
          .map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="group min-h-44 rounded-tile border border-border bg-surface p-5 transition-colors hover:border-border-strong"
            >
              <card.icon className="size-8 text-muted-foreground transition-colors group-hover:text-primary" />
              <h2 className="mt-8 text-xl font-black">
                {t(`pages.admin.nav.${card.key}`)}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(`pages.admin.dashboard.cards.${card.key}`)}
              </p>
            </Link>
          ))}
      </div>
    </AdminShell>
  );
}
