import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { PermissionGate } from "@/app/auth/PermissionGate.tsx";
import { Button } from "@/app/components/ui/Button.tsx";
import { DataTable } from "@/app/components/ui/DataTable.tsx";
import { AdminShell } from "@/app/modules/Admin/AdminShell.tsx";
import type { AdminProject, TranslatedText } from "@/app/api/admin.types.ts";
import type {
  CreateProjectBody,
  ProjectDeveloperBody,
} from "@/app/api/generated-api.ts";
import { useAdminProjectMutation, useProjectAction } from "@/app/api/mutations";
import { useAdminProjects } from "@/app/api/queries";
import { TranslatedFields } from "@/app/modules/Admin/components/TranslatedFields.tsx";
import {
  AdminErrorNotice,
  AdminLoadingState,
} from "@/app/modules/Admin/components/AdminAsyncState.tsx";
import { ProjectDevelopersFields } from "@/app/modules/Admin/Projects/ProjectDevelopersFields.tsx";

const emptyText = (): TranslatedText => ({ pl: "", en: "", de: "" });

export function AdminProjectsPage() {
  const { t } = useTranslation();
  const projects = useAdminProjects();
  const save = useAdminProjectMutation();
  const action = useProjectAction();
  const [isFormOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AdminProject | null>(null);
  const [title, setTitle] = useState(emptyText);
  const [shortDescription, setShortDescription] = useState(emptyText);
  const [detailedDescription, setDetailedDescription] = useState(emptyText);
  const [status, setStatus] = useState<CreateProjectBody["status"]>("PLANNED");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [sourceCodeUrl, setSourceCodeUrl] = useState("");
  const [sourceCodeOpen, setSourceCodeOpen] = useState(true);
  const [developers, setDevelopers] = useState<ProjectDeveloperBody[]>([]);
  const [startDate, setStartDate] = useState("");
  const [completeDate, setCompleteDate] = useState("");
  const [dateError, setDateError] = useState(false);

  function openForm(project?: AdminProject) {
    save.reset();
    setEditing(project ?? null);
    setTitle(project?.translations.title ?? emptyText());
    setShortDescription(project?.translations.shortDescription ?? emptyText());
    setDetailedDescription(
      project?.translations.detailedDescription ?? emptyText(),
    );
    setStatus(
      (project?.status.code as CreateProjectBody["status"] | undefined) ??
        "PLANNED",
    );
    setTags(project?.tags.join(", ") ?? "");
    setImageUrl(project?.imageUrl ?? "");
    setSourceCodeUrl(project?.sourceCodeUrl ?? "");
    setSourceCodeOpen(project?.sourceCodeOpen ?? true);
    setDevelopers(
      project?.developers.map((developer) => ({ ...developer })) ?? [],
    );
    setStartDate(project?.startDate ?? "");
    setCompleteDate(project?.completeDate ?? "");
    setDateError(false);
    setFormOpen(true);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (startDate && completeDate && completeDate < startDate) {
      setDateError(true);
      return;
    }

    setDateError(false);
    try {
      const payload = {
        title,
        shortDescription,
        detailedDescription,
        status,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        imageUrl: imageUrl || undefined,
        sourceCodeOpen,
        sourceCodeUrl: sourceCodeUrl || undefined,
        developers: developers.map((developer) => ({
          name: developer.name.trim(),
          role: developer.role?.trim() || undefined,
          profileUrl: developer.profileUrl?.trim() || undefined,
        })),
        isPublished: editing?.isPublished ?? false,
      };

      await save.mutateAsync(
        editing
          ? {
              uuid: editing.uuid,
              payload: {
                ...payload,
                startDate: startDate || null,
                completeDate: completeDate || null,
              },
            }
          : {
              payload: {
                ...payload,
                startDate: startDate || undefined,
                completeDate: completeDate || undefined,
              },
            },
      );
      setFormOpen(false);
    } catch {
      // The mutation state renders the API error without closing the form.
    }
  }

  const rows =
    projects.data?.map((project) => [
      project.translations.title.pl,
      project.status.label,
      project.isPublished
        ? t("pages.admin.common.published")
        : t("pages.admin.common.draft"),
      project.tags.join(", "),
      <div key={project.uuid} className="flex flex-wrap gap-2">
        <PermissionGate permission="projects:update">
          <Button onClick={() => openForm(project)}>
            {t("pages.admin.common.edit")}
          </Button>
        </PermissionGate>
        <PermissionGate permission="projects:publish">
          <Button
            disabled={action.isPending}
            onClick={() =>
              action.mutate({
                uuid: project.uuid,
                action: project.isPublished ? "unpublish" : "publish",
              })
            }
          >
            {project.isPublished
              ? t("pages.admin.common.unpublish")
              : t("pages.admin.common.publish")}
          </Button>
        </PermissionGate>
        <PermissionGate permission="projects:delete">
          <Button
            disabled={action.isPending}
            onClick={() =>
              action.mutate({ uuid: project.uuid, action: "delete" })
            }
          >
            {t("pages.admin.common.delete")}
          </Button>
        </PermissionGate>
      </div>,
    ]) ?? [];

  return (
    <AdminShell
      title={t("pages.admin.projects.title")}
      description={t("pages.admin.projects.description")}
      actions={
        <PermissionGate permission="projects:create">
          <Button variant="primary" onClick={() => openForm()}>
            {t("pages.admin.projects.new")}
          </Button>
        </PermissionGate>
      }
    >
      {projects.isPending ? <AdminLoadingState /> : null}
      {projects.isError ? (
        <AdminErrorNotice
          error={projects.error}
          onRetry={() => void projects.refetch()}
        />
      ) : null}
      {action.isError ? (
        <AdminErrorNotice error={action.error} onDismiss={action.reset} />
      ) : null}
      {projects.isSuccess ? (
        <DataTable
          headers={[
            t("pages.admin.common.title"),
            t("pages.admin.projects.projectStatus"),
            t("pages.admin.common.status"),
            t("pages.admin.projects.tags"),
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
            legend={t("pages.admin.projects.shortDescription")}
            value={shortDescription}
            multiline
            onChange={setShortDescription}
          />
          <TranslatedFields
            legend={t("pages.admin.projects.detailedDescription")}
            value={detailedDescription}
            multiline
            rows={10}
            helpText={t("pages.admin.projects.markdownHelp")}
            onChange={setDetailedDescription}
          />
          <ProjectDevelopersFields
            value={developers}
            onChange={setDevelopers}
          />
          <fieldset className="grid gap-3 rounded-tile border border-border p-3">
            <legend className="px-2 text-sm font-black">
              {t("pages.admin.projects.timeline")}
            </legend>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="grid gap-1 text-sm font-bold">
                {t("pages.admin.projects.startDate")}
                <input
                  type="date"
                  value={startDate}
                  max={completeDate || undefined}
                  onChange={(event) => {
                    setStartDate(event.target.value);
                    setDateError(false);
                  }}
                  className="min-h-10 rounded-control border border-border bg-background px-3"
                />
              </label>
              <label className="grid gap-1 text-sm font-bold">
                {t("pages.admin.projects.completeDate")}
                <input
                  type="date"
                  value={completeDate}
                  min={startDate || undefined}
                  onChange={(event) => {
                    setCompleteDate(event.target.value);
                    setDateError(false);
                  }}
                  className="min-h-10 rounded-control border border-border bg-background px-3"
                />
              </label>
            </div>
            {dateError ? (
              <p className="text-sm font-bold text-red-text">
                {t("pages.admin.projects.dateOrderError")}
              </p>
            ) : null}
          </fieldset>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <label className="grid gap-1 text-sm font-bold">
              {t("pages.admin.projects.projectStatus")}
              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as CreateProjectBody["status"])
                }
                className="min-h-10 rounded-control border border-border bg-background px-3"
              >
                {["PLANNED", "IN_PROGRESS", "COMPLETED", "ON_HOLD"].map(
                  (value) => (
                    <option key={value}>{value}</option>
                  ),
                )}
              </select>
            </label>
            <label className="grid gap-1 text-sm font-bold">
              {t("pages.admin.projects.tags")}
              <input
                value={tags}
                onChange={(event) => setTags(event.target.value)}
                className="min-h-10 rounded-control border border-border bg-background px-3"
              />
            </label>
            <label className="grid gap-1 text-sm font-bold">
              {t("pages.admin.projects.imageUrl")}
              <input
                type="url"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                className="min-h-10 rounded-control border border-border bg-background px-3"
              />
            </label>
            <label className="grid gap-1 text-sm font-bold">
              {t("pages.admin.projects.sourceUrl")}
              <input
                type="url"
                value={sourceCodeUrl}
                onChange={(event) => setSourceCodeUrl(event.target.value)}
                className="min-h-10 rounded-control border border-border bg-background px-3"
              />
            </label>
          </div>
          <label className="flex gap-2 text-sm font-bold">
            <input
              type="checkbox"
              checked={sourceCodeOpen}
              onChange={(event) => setSourceCodeOpen(event.target.checked)}
            />
            {t("pages.admin.projects.sourceOpen")}
          </label>
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
            <Button type="submit" variant="primary" disabled={save.isPending}>
              {t("pages.admin.common.save")}
            </Button>
          </div>
        </form>
      )}
    </AdminShell>
  );
}
