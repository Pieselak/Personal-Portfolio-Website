import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import type { UserResponse } from "@/app/api/generated-api.ts";
import {
  useBlockUserMutation,
  useDeleteUserMutation,
  useUnblockUserMutation,
  useUserAdminMutation,
} from "@/app/api/mutations";
import { useAdminUsers, useRoles } from "@/app/api/queries";
import { PermissionGate } from "@/app/auth/PermissionGate.tsx";
import { usePermissions } from "@/app/auth/permissions.ts";
import { Button } from "@/app/components/ui/Button.tsx";
import { DataTable } from "@/app/components/ui/DataTable.tsx";
import { AdminShell } from "@/app/modules/Admin/AdminShell.tsx";
import {
  AdminErrorNotice,
  AdminLoadingState,
} from "@/app/modules/Admin/components/AdminAsyncState.tsx";

function toLocalDateTimeInput(date: Date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 16);
}

function defaultBlockExpiration() {
  return toLocalDateTimeInput(new Date(Date.now() + 24 * 60 * 60 * 1000));
}

export function AdminUsersPage() {
  const { t, i18n } = useTranslation();
  const { has } = usePermissions();
  const users = useAdminUsers();
  const roles = useRoles();
  const update = useUserAdminMutation();
  const block = useBlockUserMutation();
  const unblock = useUnblockUserMutation();
  const remove = useDeleteUserMutation();
  const [blockingUser, setBlockingUser] = useState<UserResponse | null>(null);
  const [blockedUntil, setBlockedUntil] = useState(defaultBlockExpiration);
  const [reason, setReason] = useState("");
  const actionPending =
    update.isPending ||
    block.isPending ||
    unblock.isPending ||
    remove.isPending;

  function openBlockForm(user: UserResponse) {
    block.reset();
    setBlockingUser(user);
    setBlockedUntil(defaultBlockExpiration());
    setReason("");
  }

  async function submitBlock(event: FormEvent) {
    event.preventDefault();
    if (!blockingUser) return;
    try {
      await block.mutateAsync({
        uuid: blockingUser.uuid,
        payload: {
          blockedUntil: new Date(blockedUntil).toISOString(),
          reason,
        },
      });
      setBlockingUser(null);
    } catch {
      // The mutation state keeps the form open and renders the API error.
    }
  }

  function deleteUser(user: UserResponse) {
    if (
      window.confirm(
        t("pages.admin.users.deleteConfirm", { user: user.username }),
      )
    ) {
      remove.mutate(user.uuid);
    }
  }

  return (
    <AdminShell
      title={t("pages.admin.users.title")}
      description={t("pages.admin.users.description")}
    >
      {users.isPending || roles.isPending ? <AdminLoadingState /> : null}
      {users.isError ? (
        <AdminErrorNotice
          error={users.error}
          onRetry={() => void users.refetch()}
        />
      ) : null}
      {roles.isError ? (
        <AdminErrorNotice
          error={roles.error}
          onRetry={() => void roles.refetch()}
        />
      ) : null}
      {update.isError ? (
        <AdminErrorNotice error={update.error} onDismiss={update.reset} />
      ) : null}
      {unblock.isError ? (
        <AdminErrorNotice error={unblock.error} onDismiss={unblock.reset} />
      ) : null}
      {remove.isError ? (
        <AdminErrorNotice error={remove.error} onDismiss={remove.reset} />
      ) : null}
      {users.isSuccess && roles.isSuccess ? (
        <DataTable
          headers={[
            t("pages.admin.users.user"),
            t("pages.admin.users.email"),
            t("pages.admin.users.role"),
            t("pages.admin.common.status"),
            t("pages.admin.common.actions"),
          ]}
          rows={users.data.map((user) => [
            user.username,
            user.email,
            <select
              key={`${user.uuid}-role`}
              value={user.role.code}
              disabled={actionPending || !has("users.roles:update")}
              onChange={(event) =>
                update.mutate({
                  uuid: user.uuid,
                  roleCode: event.target.value,
                })
              }
              className="min-h-9 rounded-control border border-border bg-background px-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {roles.data.map((role) => (
                <option key={role.code} value={role.code}>
                  {role.label}
                </option>
              ))}
            </select>,
            user.isBlocked ? (
              <div key={`${user.uuid}-blocked`} className="grid gap-1">
                <span className="font-bold text-red-text">
                  {t("pages.admin.users.blocked")}
                </span>
                <span className="text-xs">
                  {t("pages.admin.users.blockedUntil", {
                    date: user.blockedUntil
                      ? new Intl.DateTimeFormat(i18n.language, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(new Date(user.blockedUntil))
                      : "",
                  })}
                </span>
                {user.blockedReason ? (
                  <span className="text-xs">{user.blockedReason}</span>
                ) : null}
              </div>
            ) : user.isActive ? (
              t("pages.admin.users.active")
            ) : (
              t("pages.admin.users.inactive")
            ),
            <div key={`${user.uuid}-actions`} className="flex flex-wrap gap-2">
              <PermissionGate permission="users.status:update">
                <Button
                  disabled={actionPending}
                  onClick={() =>
                    update.mutate({
                      uuid: user.uuid,
                      isActive: !user.isActive,
                    })
                  }
                >
                  {user.isActive
                    ? t("pages.admin.users.deactivate")
                    : t("pages.admin.users.activate")}
                </Button>
              </PermissionGate>
              <PermissionGate permission="users.status:update">
                {user.isBlocked ? (
                  <Button
                    disabled={actionPending}
                    onClick={() => unblock.mutate(user.uuid)}
                  >
                    {t("pages.admin.users.unblock")}
                  </Button>
                ) : (
                  <Button
                    disabled={actionPending}
                    onClick={() => openBlockForm(user)}
                  >
                    {t("pages.admin.users.block")}
                  </Button>
                )}
              </PermissionGate>
              <PermissionGate permission="users:delete">
                <Button
                  disabled={actionPending}
                  onClick={() => deleteUser(user)}
                >
                  {t("pages.admin.common.delete")}
                </Button>
              </PermissionGate>
            </div>,
          ])}
          emptyMessage={t("pages.admin.common.empty")}
        />
      ) : null}
      {blockingUser ? (
        <form
          onSubmit={submitBlock}
          className="grid gap-4 rounded-tile border border-border bg-surface p-4"
        >
          <div>
            <h2 className="font-black">
              {t("pages.admin.users.blockTitle", {
                user: blockingUser.username,
              })}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("pages.admin.users.blockDescription")}
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="grid gap-1 text-sm font-bold">
              {t("pages.admin.users.blockedUntilLabel")}
              <input
                type="datetime-local"
                value={blockedUntil}
                min={toLocalDateTimeInput(new Date())}
                onChange={(event) => setBlockedUntil(event.target.value)}
                required
                className="min-h-10 rounded-control border border-border bg-background px-3"
              />
            </label>
            <label className="grid gap-1 text-sm font-bold">
              {t("pages.admin.users.blockReason")}
              <input
                value={reason}
                minLength={3}
                maxLength={500}
                onChange={(event) => setReason(event.target.value)}
                required
                className="min-h-10 rounded-control border border-border bg-background px-3"
              />
            </label>
          </div>
          {block.isError ? (
            <AdminErrorNotice error={block.error} onDismiss={block.reset} />
          ) : null}
          <div className="flex justify-end gap-2">
            <Button
              disabled={block.isPending}
              onClick={() => {
                block.reset();
                setBlockingUser(null);
              }}
            >
              {t("pages.admin.common.cancel")}
            </Button>
            <Button type="submit" variant="primary" disabled={block.isPending}>
              {t("pages.admin.users.confirmBlock")}
            </Button>
          </div>
        </form>
      ) : null}
    </AdminShell>
  );
}
