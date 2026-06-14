import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/app/components/ui/Button.tsx";
import { DataTable } from "@/app/components/ui/DataTable.tsx";
import { AdminShell } from "@/app/modules/Admin/AdminShell.tsx";
import type { Role } from "@/app/api/admin.types.ts";
import { useDeleteRoleMutation, useRoleMutation } from "@/app/api/mutations";
import { usePermissionCatalog, useRoles } from "@/app/api/queries";
import { PermissionGate } from "@/app/auth/PermissionGate.tsx";
import {
  AdminErrorNotice,
  AdminLoadingState,
} from "@/app/modules/Admin/components/AdminAsyncState.tsx";

export function AdminRolesPage() {
  const { t } = useTranslation();
  const roles = useRoles();
  const catalog = usePermissionCatalog();
  const save = useRoleMutation();
  const remove = useDeleteRoleMutation();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Role | null>(null);
  const [deleting, setDeleting] = useState<Role | null>(null);
  const [replacementRoleCode, setReplacementRoleCode] = useState("");
  const [code, setCode] = useState("");
  const [label, setLabel] = useState("");
  const [permissions, setPermissions] = useState<string[]>([]);

  function edit(role?: Role) {
    save.reset();
    setDeleting(null);
    setEditing(role ?? null);
    setCode(role?.code ?? "");
    setLabel(role?.label ?? "");
    setPermissions(role?.permissions ?? []);
    setOpen(true);
  }

  function startDelete(role: Role) {
    remove.reset();
    setOpen(false);
    setDeleting(role);
    setReplacementRoleCode(
      roles.data?.find((item) => item.code !== role.code)?.code ?? "",
    );
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    try {
      await save.mutateAsync({
        code: editing?.code,
        payload: editing
          ? { label, permissions }
          : { code, label, permissions },
      });
      setOpen(false);
    } catch {
      // The mutation state renders the API error without closing the form.
    }
  }

  async function submitDelete(event: FormEvent) {
    event.preventDefault();
    if (!deleting) return;
    try {
      await remove.mutateAsync({
        code: deleting.code,
        payload: { replacementRoleCode },
      });
      setDeleting(null);
    } catch {
      // The mutation state keeps the replacement form open.
    }
  }

  return (
    <AdminShell
      title={t("pages.admin.roles.title")}
      description={t("pages.admin.roles.description")}
      actions={
        <PermissionGate permission="roles:create">
          <Button
            variant="primary"
            disabled={catalog.isPending || catalog.isError}
            onClick={() => edit()}
          >
            {t("pages.admin.roles.new")}
          </Button>
        </PermissionGate>
      }
    >
      {roles.isPending ? <AdminLoadingState /> : null}
      {roles.isError ? (
        <AdminErrorNotice
          error={roles.error}
          onRetry={() => void roles.refetch()}
        />
      ) : null}
      {catalog.isError ? (
        <AdminErrorNotice
          error={catalog.error}
          onRetry={() => void catalog.refetch()}
        />
      ) : null}
      {remove.isError && !deleting ? (
        <AdminErrorNotice error={remove.error} onDismiss={remove.reset} />
      ) : null}
      {roles.isSuccess ? (
        <DataTable
          headers={[
            t("pages.admin.roles.role"),
            t("pages.admin.roles.permissions"),
            t("pages.admin.roles.system"),
            t("pages.admin.common.actions"),
          ]}
          rows={roles.data.map((role) => [
            `${role.label} (${role.code})`,
            role.permissions.length,
            role.isSystem
              ? t("pages.admin.common.yes")
              : t("pages.admin.common.no"),
            <div key={role.code} className="flex flex-wrap gap-2">
              <PermissionGate permission="roles:update">
                <Button
                  disabled={
                    role.code === "ADMIN" ||
                    catalog.isPending ||
                    catalog.isError
                  }
                  onClick={() => edit(role)}
                >
                  {t("pages.admin.common.edit")}
                </Button>
              </PermissionGate>
              <PermissionGate permission="roles:delete">
                <Button
                  disabled={role.isSystem || remove.isPending}
                  onClick={() => startDelete(role)}
                >
                  {t("pages.admin.common.delete")}
                </Button>
              </PermissionGate>
            </div>,
          ])}
          emptyMessage={t("pages.admin.common.empty")}
        />
      ) : null}
      {deleting ? (
        <form
          onSubmit={submitDelete}
          className="grid gap-4 rounded-tile border border-border bg-surface p-4"
        >
          <div>
            <h2 className="font-black">
              {t("pages.admin.roles.deleteTitle", { role: deleting.label })}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("pages.admin.roles.deleteDescription")}
            </p>
          </div>
          <label className="grid gap-1 text-sm font-bold">
            {t("pages.admin.roles.replacementRole")}
            <select
              value={replacementRoleCode}
              onChange={(event) => setReplacementRoleCode(event.target.value)}
              required
              className="min-h-10 rounded-control border border-border bg-background px-3"
            >
              {roles.data
                ?.filter((role) => role.code !== deleting.code)
                .map((role) => (
                  <option key={role.code} value={role.code}>
                    {role.label}
                  </option>
                ))}
            </select>
          </label>
          {remove.isError ? (
            <AdminErrorNotice error={remove.error} onDismiss={remove.reset} />
          ) : null}
          <div className="flex justify-end gap-2">
            <Button
              disabled={remove.isPending}
              onClick={() => {
                remove.reset();
                setDeleting(null);
              }}
            >
              {t("pages.admin.common.cancel")}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!replacementRoleCode || remove.isPending}
            >
              {t("pages.admin.roles.confirmDelete")}
            </Button>
          </div>
        </form>
      ) : null}
      {open && (
        <form
          onSubmit={submit}
          className="grid gap-4 rounded-tile border border-border bg-surface p-4"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-sm font-bold">
              {t("pages.admin.roles.code")}
              <input
                value={code}
                disabled={Boolean(editing)}
                onChange={(event) => setCode(event.target.value.toUpperCase())}
                required
                className="min-h-10 rounded-control border border-border bg-background px-3"
              />
            </label>
            <label className="grid gap-1 text-sm font-bold">
              {t("pages.admin.roles.label")}
              <input
                value={label}
                onChange={(event) => setLabel(event.target.value)}
                required
                className="min-h-10 rounded-control border border-border bg-background px-3"
              />
            </label>
          </div>
          <fieldset className="grid gap-2 rounded-tile border border-border p-3 sm:grid-cols-2 xl:grid-cols-3">
            <legend className="px-2 text-sm font-black">
              {t("pages.admin.roles.permissions")}
            </legend>
            {catalog.data?.map((permission) => (
              <label
                key={permission}
                className="flex gap-2 rounded-control border border-border p-2 text-xs font-bold"
              >
                <input
                  type="checkbox"
                  checked={permissions.includes(permission)}
                  onChange={(event) =>
                    setPermissions((current) =>
                      event.target.checked
                        ? [...current, permission]
                        : current.filter((item) => item !== permission),
                    )
                  }
                />
                {permission}
              </label>
            ))}
          </fieldset>
          {save.isError ? (
            <AdminErrorNotice error={save.error} onDismiss={save.reset} />
          ) : null}
          <div className="flex justify-end gap-2">
            <Button
              disabled={save.isPending}
              onClick={() => {
                save.reset();
                setOpen(false);
              }}
            >
              {t("pages.admin.common.cancel")}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={save.isPending || catalog.isPending || catalog.isError}
            >
              {t("pages.admin.common.save")}
            </Button>
          </div>
        </form>
      )}
    </AdminShell>
  );
}
