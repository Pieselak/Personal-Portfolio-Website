import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { PermissionGate } from "@/app/auth/PermissionGate.tsx";
import { Button } from "@/app/components/ui/Button.tsx";
import { DataTable } from "@/app/components/ui/DataTable.tsx";
import { AdminShell } from "@/app/modules/Admin/AdminShell.tsx";
import type { Announcement, TranslatedText } from "@/app/api/admin.types.ts";
import {
  useAnnouncementAction,
  useAnnouncementMutation,
} from "@/app/api/mutations";
import { useAnnouncements } from "@/app/api/queries";
import { TranslatedFields } from "@/app/modules/Admin/components/TranslatedFields.tsx";
import {
  AdminErrorNotice,
  AdminLoadingState,
} from "@/app/modules/Admin/components/AdminAsyncState.tsx";

const emptyText = (): TranslatedText => ({ pl: "", en: "", de: "" });

export function AdminAnnouncementsPage() {
  const { t } = useTranslation();
  const announcements = useAnnouncements();
  const save = useAnnouncementMutation();
  const action = useAnnouncementAction();
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const [title, setTitle] = useState(emptyText);
  const [content, setContent] = useState(emptyText);
  const [actionLabel, setActionLabel] = useState(emptyText);
  const [actionUrl, setActionUrl] = useState("");
  const [variant, setVariant] = useState<Announcement["variant"]>("INFO");
  const [dismissible, setDismissible] = useState(true);

  function edit(item?: Announcement) {
    save.reset();
    setEditing(item ?? null);
    setTitle(item?.title ?? emptyText());
    setContent(item?.content ?? emptyText());
    setActionLabel(item?.actionLabel ?? emptyText());
    setActionUrl(item?.actionUrl ?? "");
    setVariant(item?.variant ?? "INFO");
    setDismissible(item?.dismissible ?? true);
    setFormOpen(true);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    try {
      await save.mutateAsync({
        uuid: editing?.uuid,
        payload: {
          title,
          content,
          actionLabel: actionUrl ? actionLabel : undefined,
          actionUrl: actionUrl || undefined,
          variant,
          dismissible,
        },
      });
      setFormOpen(false);
    } catch {
      // The mutation state renders the API error without closing the form.
    }
  }

  const rows =
    announcements.data?.map((item) => [
      item.title.pl,
      item.variant,
      item.published
        ? t("pages.admin.common.published")
        : t("pages.admin.common.draft"),
      <div key={item.uuid} className="flex flex-wrap gap-2">
        <PermissionGate permission="announcements:update">
          <Button onClick={() => edit(item)}>
            {t("pages.admin.common.edit")}
          </Button>
        </PermissionGate>
        <PermissionGate permission="announcements:publish">
          <Button
            disabled={action.isPending}
            onClick={() =>
              action.mutate({
                uuid: item.uuid,
                action: item.published ? "unpublish" : "publish",
              })
            }
          >
            {item.published
              ? t("pages.admin.common.unpublish")
              : t("pages.admin.common.publish")}
          </Button>
        </PermissionGate>
        <PermissionGate permission="announcements:delete">
          <Button
            disabled={item.published || action.isPending}
            onClick={() => action.mutate({ uuid: item.uuid, action: "delete" })}
          >
            {t("pages.admin.common.delete")}
          </Button>
        </PermissionGate>
      </div>,
    ]) ?? [];

  return (
    <AdminShell
      title={t("pages.admin.announcements.title")}
      description={t("pages.admin.announcements.description")}
      actions={
        <PermissionGate permission="announcements:create">
          <Button variant="primary" onClick={() => edit()}>
            {t("pages.admin.announcements.new")}
          </Button>
        </PermissionGate>
      }
    >
      {announcements.isPending ? <AdminLoadingState /> : null}
      {announcements.isError ? (
        <AdminErrorNotice
          error={announcements.error}
          onRetry={() => void announcements.refetch()}
        />
      ) : null}
      {action.isError ? (
        <AdminErrorNotice error={action.error} onDismiss={action.reset} />
      ) : null}
      {announcements.isSuccess ? (
        <DataTable
          headers={[
            t("pages.admin.common.title"),
            t("pages.admin.announcements.variant"),
            t("pages.admin.common.status"),
            t("pages.admin.common.actions"),
          ]}
          rows={rows}
          emptyMessage={t("pages.admin.common.empty")}
        />
      ) : null}
      {isFormOpen && (
        <form
          onSubmit={submit}
          className="grid gap-4 rounded-tile border border-border bg-surface p-4"
        >
          <TranslatedFields
            legend={t("pages.admin.common.title")}
            value={title}
            onChange={setTitle}
          />
          <TranslatedFields
            legend={t("pages.admin.announcements.content")}
            value={content}
            multiline
            onChange={setContent}
          />
          <div className="grid gap-3 md:grid-cols-3">
            <label className="grid gap-1 text-sm font-bold">
              {t("pages.admin.announcements.variant")}
              <select
                value={variant}
                onChange={(event) =>
                  setVariant(event.target.value as Announcement["variant"])
                }
                className="min-h-10 rounded-control border border-border bg-background px-3"
              >
                {["INFO", "SUCCESS", "WARNING", "CRITICAL"].map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1 text-sm font-bold">
              {t("pages.admin.announcements.actionUrl")}
              <input
                value={actionUrl}
                onChange={(event) => setActionUrl(event.target.value)}
                className="min-h-10 rounded-control border border-border bg-background px-3"
              />
            </label>
            <label className="flex items-end gap-2 pb-2 text-sm font-bold">
              <input
                type="checkbox"
                checked={dismissible}
                onChange={(event) => setDismissible(event.target.checked)}
              />
              {t("pages.admin.announcements.dismissible")}
            </label>
          </div>
          {actionUrl && (
            <TranslatedFields
              legend={t("pages.admin.announcements.actionLabel")}
              value={actionLabel}
              onChange={setActionLabel}
            />
          )}
          {save.isError ? (
            <AdminErrorNotice error={save.error} onDismiss={save.reset} />
          ) : null}
          <div className="flex justify-end gap-2">
            <Button
              disabled={save.isPending}
              onClick={() => {
                save.reset();
                setFormOpen(false);
              }}
            >
              {t("pages.admin.common.cancel")}
            </Button>
            <Button variant="primary" type="submit" disabled={save.isPending}>
              {t("pages.admin.common.save")}
            </Button>
          </div>
        </form>
      )}
    </AdminShell>
  );
}
