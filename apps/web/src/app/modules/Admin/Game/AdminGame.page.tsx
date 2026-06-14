import { useState, type ChangeEvent, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Download, FileJson, Upload } from "lucide-react";
import { PermissionGate } from "@/app/auth/PermissionGate.tsx";
import { Button } from "@/app/components/ui/Button.tsx";
import { DataTable } from "@/app/components/ui/DataTable.tsx";
import { Notice } from "@/app/components/ui/Notice.tsx";
import { SegmentedControl } from "@/app/components/ui/SegmentedControl.tsx";
import { AdminShell } from "@/app/modules/Admin/AdminShell.tsx";
import type {
  GameAnswer,
  GameBoss,
  GameQuestion,
  TranslatedText,
} from "@/app/api/admin.types.ts";
import type { ImportGameContentBody } from "@/app/api/generated-api.ts";
import {
  useBossMutation,
  useDeleteGameContent,
  useImportGameContentMutation,
  useQuestionMutation,
} from "@/app/api/mutations";
import { useAdminBosses, useAdminQuestions } from "@/app/api/queries";
import { TranslatedFields } from "@/app/modules/Admin/components/TranslatedFields.tsx";
import {
  AdminErrorNotice,
  AdminLoadingState,
} from "@/app/modules/Admin/components/AdminAsyncState.tsx";

const emptyText = (): TranslatedText => ({ pl: "", en: "", de: "" });
const emptyAnswer = (): GameAnswer => ({
  content: emptyText(),
  isCorrect: false,
});
const MAX_IMPORT_FILE_SIZE = 2 * 1024 * 1024;
const IMPORT_EXAMPLE_FILE_NAME = "game-boss-import.example.json";
const importExample = {
  version: 1,
  bosses: [
    {
      slug: "example-diabetes-boss",
      name: {
        pl: "Przykladowy boss cukrzycowy",
        en: "Example diabetes boss",
        de: "Beispiel-Diabetesboss",
      },
      description: {
        pl: "Boss demonstracyjny zawierajacy wszystkie typy pytan.",
        en: "A demonstration boss containing every question type.",
        de: "Ein Demonstrationsboss mit allen Fragetypen.",
      },
      maxRounds: 10,
      published: false,
      questions: [
        {
          content: {
            pl: "Ktory objaw moze wskazywac na hipoglikemie?",
            en: "Which symptom may indicate hypoglycemia?",
            de: "Welches Symptom kann auf eine Hypoglykamie hinweisen?",
          },
          explanation: {
            pl: "Drzenie, potliwosc i nagle oslabienie moga wskazywac na zbyt niski poziom glukozy.",
            en: "Shaking, sweating and sudden weakness may indicate low blood glucose.",
            de: "Zittern, Schwitzen und plotzliche Schwache konnen auf einen niedrigen Blutzucker hinweisen.",
          },
          type: "SINGLE_CHOICE",
          category: "hypoglycemia",
          difficulty: 1,
          sourceUrl:
            "https://diabetes.org/living-with-diabetes/treatment-care/hypoglycemia",
          verifiedAt: "2026-06-14",
          published: false,
          answers: [
            {
              content: {
                pl: "Drzenie i zimny pot",
                en: "Shaking and cold sweat",
                de: "Zittern und kalter Schweiss",
              },
              isCorrect: true,
            },
            {
              content: {
                pl: "Poprawa koncentracji",
                en: "Improved concentration",
                de: "Verbesserte Konzentration",
              },
              isCorrect: false,
            },
          ],
        },
        {
          content: {
            pl: "Insulina obniza poziom glukozy we krwi.",
            en: "Insulin lowers blood glucose.",
            de: "Insulin senkt den Blutzuckerspiegel.",
          },
          explanation: {
            pl: "Insulina pomaga glukozie przedostac sie z krwi do komorek.",
            en: "Insulin helps glucose move from the blood into cells.",
            de: "Insulin hilft Glukose, aus dem Blut in die Zellen zu gelangen.",
          },
          type: "TRUE_FALSE",
          category: "basics",
          difficulty: 1,
          sourceUrl: "https://diabetes.org/health-wellness/medication/insulin",
          verifiedAt: "2026-06-14",
          published: false,
          answers: [
            {
              content: { pl: "Prawda", en: "True", de: "Wahr" },
              isCorrect: true,
            },
            {
              content: { pl: "Falsz", en: "False", de: "Falsch" },
              isCorrect: false,
            },
          ],
        },
        {
          content: {
            pl: "Uloz podstawowe kroki pomocy przy podejrzeniu hipoglikemii.",
            en: "Put the basic response to suspected hypoglycemia in order.",
            de: "Ordne die grundlegenden Schritte bei Verdacht auf Hypoglykamie.",
          },
          explanation: {
            pl: "Najpierw ocen sytuacje i zmierz glukoze, nastepnie podaj szybko dzialajace weglowodany i ponownie sprawdz wynik.",
            en: "Assess the situation and check glucose first, then give fast-acting carbohydrates and recheck.",
            de: "Beurteile zuerst die Situation und miss den Blutzucker, gib dann schnell wirkende Kohlenhydrate und kontrolliere erneut.",
          },
          type: "ORDER",
          category: "first-aid",
          difficulty: 3,
          sourceUrl:
            "https://diabetes.org/living-with-diabetes/treatment-care/hypoglycemia",
          verifiedAt: "2026-06-14",
          published: false,
          answers: [
            {
              content: {
                pl: "Ocen stan osoby i zmierz glukoze, jesli to mozliwe",
                en: "Assess the person and check glucose if possible",
                de: "Zustand beurteilen und wenn moglich Glukose messen",
              },
              isCorrect: true,
              orderIndex: 0,
            },
            {
              content: {
                pl: "Podaj szybko dzialajace weglowodany, jesli osoba jest przytomna",
                en: "Give fast-acting carbohydrates if the person is conscious",
                de: "Bei Bewusstsein schnell wirkende Kohlenhydrate geben",
              },
              isCorrect: true,
              orderIndex: 1,
            },
            {
              content: {
                pl: "Ponownie sprawdz glukoze po zalecanym czasie",
                en: "Recheck glucose after the recommended time",
                de: "Glukose nach der empfohlenen Zeit erneut kontrollieren",
              },
              isCorrect: true,
              orderIndex: 2,
            },
          ],
        },
        {
          content: {
            pl: "Dopasuj pojecie do odpowiadajacego mu opisu.",
            en: "Match each term with its corresponding description.",
            de: "Ordne jedem Begriff die passende Beschreibung zu.",
          },
          explanation: {
            pl: "Hipoglikemia oznacza zbyt niski, a hiperglikemia zbyt wysoki poziom glukozy.",
            en: "Hypoglycemia means glucose is too low, while hyperglycemia means it is too high.",
            de: "Hypoglykamie bedeutet zu niedrigen, Hyperglykamie zu hohen Blutzucker.",
          },
          type: "MATCHING",
          category: "basics",
          difficulty: 2,
          sourceUrl: "https://diabetes.org/about-diabetes",
          verifiedAt: "2026-06-14",
          published: false,
          answers: [
            {
              content: {
                pl: "Hipoglikemia",
                en: "Hypoglycemia",
                de: "Hypoglykamie",
              },
              isCorrect: true,
              matchKey: "low-glucose",
            },
            {
              content: {
                pl: "Zbyt niski poziom glukozy",
                en: "Blood glucose that is too low",
                de: "Zu niedriger Blutzucker",
              },
              isCorrect: true,
              matchKey: "low-glucose",
            },
            {
              content: {
                pl: "Hiperglikemia",
                en: "Hyperglycemia",
                de: "Hyperglykamie",
              },
              isCorrect: true,
              matchKey: "high-glucose",
            },
            {
              content: {
                pl: "Zbyt wysoki poziom glukozy",
                en: "Blood glucose that is too high",
                de: "Zu hoher Blutzucker",
              },
              isCorrect: true,
              matchKey: "high-glucose",
            },
          ],
        },
      ],
    },
  ],
} satisfies ImportGameContentBody;

function isImportGameContentBody(
  value: unknown,
): value is ImportGameContentBody {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as { version?: unknown; bosses?: unknown };
  return candidate.version === 1 && Array.isArray(candidate.bosses);
}

function downloadImportExample() {
  const blob = new Blob([JSON.stringify(importExample, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = IMPORT_EXAMPLE_FILE_NAME;
  link.click();
  URL.revokeObjectURL(url);
}

export function AdminGamePage() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<"bosses" | "questions">("bosses");
  return (
    <AdminShell
      title={t("pages.admin.game.title")}
      description={t("pages.admin.game.description")}
    >
      <SegmentedControl
        ariaLabel={t("pages.admin.game.title")}
        value={tab}
        onChange={setTab}
        options={[
          { value: "bosses", label: t("pages.admin.game.bosses") },
          { value: "questions", label: t("pages.admin.game.questions") },
        ]}
      />
      {tab === "bosses" ? <BossesPanel /> : <QuestionsPanel />}
    </AdminShell>
  );
}

function BossesPanel() {
  const { t } = useTranslation();
  const bosses = useAdminBosses();
  const save = useBossMutation();
  const importContent = useImportGameContentMutation();
  const remove = useDeleteGameContent();
  const [open, setOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [importPayload, setImportPayload] =
    useState<ImportGameContentBody | null>(null);
  const [importFileName, setImportFileName] = useState("");
  const [importFileError, setImportFileError] = useState("");
  const [editing, setEditing] = useState<GameBoss | null>(null);
  const [slug, setSlug] = useState("");
  const [name, setName] = useState(emptyText);
  const [description, setDescription] = useState(emptyText);
  const [maxRounds, setMaxRounds] = useState(15);
  const [published, setPublished] = useState(false);

  function edit(item?: GameBoss) {
    save.reset();
    importContent.reset();
    setImportOpen(false);
    setEditing(item ?? null);
    setSlug(item?.slug ?? "");
    setName(item?.name ?? emptyText());
    setDescription(item?.description ?? emptyText());
    setMaxRounds(item?.maxRounds ?? 15);
    setPublished(item?.published ?? false);
    setOpen(true);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    try {
      await save.mutateAsync({
        uuid: editing?.uuid,
        payload: { slug, name, description, maxRounds, published },
      });
      setOpen(false);
    } catch {
      // The mutation state renders the API error without closing the form.
    }
  }

  function toggleImport() {
    save.reset();
    setOpen(false);
    importContent.reset();
    setImportPayload(null);
    setImportFileName("");
    setImportFileError("");
    setImportOpen((current) => !current);
  }

  async function selectImportFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    importContent.reset();
    setImportPayload(null);
    setImportFileName(file?.name ?? "");
    setImportFileError("");

    if (!file) {
      return;
    }
    if (file.size > MAX_IMPORT_FILE_SIZE) {
      setImportFileError(t("pages.admin.game.importTooLarge"));
      return;
    }

    try {
      const parsed: unknown = JSON.parse(await file.text());
      if (!isImportGameContentBody(parsed)) {
        setImportFileError(t("pages.admin.game.importInvalidStructure"));
        return;
      }
      setImportPayload(parsed);
    } catch {
      setImportFileError(t("pages.admin.game.importInvalidJson"));
    }
  }

  async function submitImport(event: FormEvent) {
    event.preventDefault();
    if (!importPayload) {
      return;
    }

    try {
      await importContent.mutateAsync(importPayload);
      setImportPayload(null);
      setImportFileName("");
    } catch {
      // The mutation state renders the API error and keeps the selected file.
    }
  }

  return (
    <div className="space-y-3">
      <PermissionGate permission="game.content:create">
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" onClick={() => edit()}>
            {t("pages.admin.game.newBoss")}
          </Button>
          <Button onClick={toggleImport}>
            <FileJson className="size-4" aria-hidden="true" />
            {t("pages.admin.game.importJson")}
          </Button>
        </div>
      </PermissionGate>
      {importOpen ? (
        <PermissionGate permission="game.content:create">
          <form
            onSubmit={submitImport}
            className="grid gap-4 rounded-tile border border-border bg-surface p-4"
          >
            <div>
              <h3 className="font-black">
                {t("pages.admin.game.importTitle")}
              </h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {t("pages.admin.game.importDescription")}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-control border border-border bg-surface-inset p-3">
              <p className="text-sm leading-6 text-muted-foreground">
                {t("pages.admin.game.importExampleDescription")}
              </p>
              <Button onClick={downloadImportExample}>
                <Download className="size-4" aria-hidden="true" />
                {t("pages.admin.game.downloadImportExample")}
              </Button>
            </div>
            <label className="grid gap-2 text-sm font-bold">
              {t("pages.admin.game.importFile")}
              <input
                type="file"
                accept=".json,application/json"
                onChange={(event) => void selectImportFile(event)}
                className="min-h-11 rounded-control border border-border bg-background px-3 py-2 file:mr-3 file:rounded-control file:border-0 file:bg-surface-raised file:px-3 file:py-1 file:font-bold file:text-foreground"
              />
            </label>
            {importFileName && importPayload ? (
              <Notice tone="gray">
                {t("pages.admin.game.importReady", {
                  file: importFileName,
                  count: importPayload.bosses.length,
                })}
              </Notice>
            ) : null}
            {importFileError ? (
              <Notice tone="red" title={t("pages.admin.game.importError")}>
                {importFileError}
              </Notice>
            ) : null}
            {importContent.isError ? (
              <AdminErrorNotice
                error={importContent.error}
                onDismiss={importContent.reset}
              />
            ) : null}
            {importContent.isSuccess ? (
              <Notice tone="green" title={t("pages.admin.game.importSuccess")}>
                {t("pages.admin.game.importSuccessDescription", {
                  bosses: importContent.data.data.bossesImported,
                  questions: importContent.data.data.questionsImported,
                })}
              </Notice>
            ) : null}
            <div className="flex justify-end gap-2">
              <Button disabled={importContent.isPending} onClick={toggleImport}>
                {t("pages.admin.common.cancel")}
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={!importPayload || importContent.isPending}
              >
                <Upload className="size-4" aria-hidden="true" />
                {importContent.isPending
                  ? t("pages.admin.game.importing")
                  : t("pages.admin.game.importAction")}
              </Button>
            </div>
          </form>
        </PermissionGate>
      ) : null}
      {bosses.isPending ? <AdminLoadingState /> : null}
      {bosses.isError ? (
        <AdminErrorNotice
          error={bosses.error}
          onRetry={() => void bosses.refetch()}
        />
      ) : null}
      {remove.isError ? (
        <AdminErrorNotice error={remove.error} onDismiss={remove.reset} />
      ) : null}
      {bosses.isSuccess ? (
        <DataTable
          headers={[
            t("pages.admin.common.title"),
            "Slug",
            t("pages.admin.common.status"),
            t("pages.admin.common.actions"),
          ]}
          rows={bosses.data.map((boss) => [
            boss.name.pl,
            boss.slug,
            boss.published
              ? t("pages.admin.common.published")
              : t("pages.admin.common.draft"),
            <div key={boss.uuid} className="flex gap-2">
              <Button disabled={remove.isPending} onClick={() => edit(boss)}>
                {t("pages.admin.common.edit")}
              </Button>
              <Button
                disabled={remove.isPending}
                onClick={() => remove.mutate({ type: "boss", uuid: boss.uuid })}
              >
                {t("pages.admin.common.delete")}
              </Button>
            </div>,
          ])}
          emptyMessage={t("pages.admin.common.empty")}
        />
      ) : null}
      {open && (
        <form
          onSubmit={submit}
          className="grid gap-4 rounded-tile border border-border bg-surface p-4"
        >
          <label className="grid gap-1 text-sm font-bold">
            {t("pages.admin.game.bossSlug")}
            <input
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              pattern="[a-z0-9-]+"
              required
              className="min-h-10 rounded-control border border-border bg-background px-3"
            />
            <span className="font-normal leading-5 text-muted-foreground">
              {t("pages.admin.game.bossSlugHelp")}
            </span>
          </label>
          <TranslatedFields
            legend={t("pages.admin.common.title")}
            value={name}
            onChange={setName}
          />
          <TranslatedFields
            legend={t("pages.admin.common.description")}
            value={description}
            multiline
            onChange={setDescription}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-sm font-bold">
              {t("pages.admin.game.rounds")}
              <input
                type="number"
                min={5}
                max={30}
                value={maxRounds}
                onChange={(event) => setMaxRounds(Number(event.target.value))}
                className="min-h-10 rounded-control border border-border bg-background px-3"
              />
            </label>
            <label className="flex items-end gap-2 pb-2 text-sm font-bold">
              <input
                type="checkbox"
                checked={published}
                onChange={(event) => setPublished(event.target.checked)}
              />
              {t("pages.admin.common.published")}
            </label>
          </div>
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
            <Button type="submit" variant="primary" disabled={save.isPending}>
              {t("pages.admin.common.save")}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

function QuestionsPanel() {
  const { t } = useTranslation();
  const bosses = useAdminBosses();
  const questions = useAdminQuestions();
  const save = useQuestionMutation();
  const remove = useDeleteGameContent();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<GameQuestion | null>(null);
  const [bossUuid, setBossUuid] = useState("");
  const [content, setContent] = useState(emptyText);
  const [explanation, setExplanation] = useState(emptyText);
  const [type, setType] = useState<GameQuestion["type"]>("SINGLE_CHOICE");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [sourceUrl, setSourceUrl] = useState("");
  const [verifiedAt, setVerifiedAt] = useState("");
  const [published, setPublished] = useState(false);
  const [answers, setAnswers] = useState<GameAnswer[]>([
    emptyAnswer(),
    emptyAnswer(),
  ]);

  function edit(question?: GameQuestion) {
    save.reset();
    setEditing(question ?? null);
    setBossUuid(question?.boss.uuid ?? bosses.data?.[0]?.uuid ?? "");
    setContent(question?.content ?? emptyText());
    setExplanation(question?.explanation ?? emptyText());
    setType(question?.type ?? "SINGLE_CHOICE");
    setCategory(question?.category ?? "");
    setDifficulty(question?.difficulty ?? 1);
    setSourceUrl(question?.sourceUrl ?? "");
    setVerifiedAt(question?.verifiedAt?.slice(0, 10) ?? "");
    setPublished(question?.published ?? false);
    setAnswers(question?.answers ?? [emptyAnswer(), emptyAnswer()]);
    setOpen(true);
  }

  function updateAnswer(index: number, answer: GameAnswer) {
    setAnswers((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? answer : item)),
    );
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    try {
      await save.mutateAsync({
        uuid: editing?.uuid,
        payload: {
          bossUuid,
          content,
          explanation,
          type,
          category,
          difficulty,
          sourceUrl,
          verifiedAt,
          published,
          answers: answers.map((answer, index) => ({
            content: answer.content,
            isCorrect:
              type === "ORDER" || type === "MATCHING" ? true : answer.isCorrect,
            orderIndex: type === "ORDER" ? index : undefined,
            matchKey:
              type === "MATCHING" ? (answer.matchKey ?? undefined) : undefined,
          })),
        },
      });
      setOpen(false);
    } catch {
      // The mutation state renders the API error without closing the form.
    }
  }

  return (
    <div className="space-y-3">
      <Button
        variant="primary"
        disabled={bosses.isPending || bosses.isError}
        onClick={() => edit()}
      >
        {t("pages.admin.game.newQuestion")}
      </Button>
      {bosses.isError ? (
        <AdminErrorNotice
          error={bosses.error}
          onRetry={() => void bosses.refetch()}
        />
      ) : null}
      {questions.isPending ? <AdminLoadingState /> : null}
      {questions.isError ? (
        <AdminErrorNotice
          error={questions.error}
          onRetry={() => void questions.refetch()}
        />
      ) : null}
      {remove.isError ? (
        <AdminErrorNotice error={remove.error} onDismiss={remove.reset} />
      ) : null}
      {questions.isSuccess ? (
        <DataTable
          headers={[
            t("pages.admin.common.title"),
            t("pages.admin.game.questionType"),
            t("pages.admin.game.category"),
            t("pages.admin.common.status"),
            t("pages.admin.common.actions"),
          ]}
          rows={questions.data.map((question) => [
            question.content.pl,
            question.type,
            question.category,
            question.published
              ? t("pages.admin.common.published")
              : t("pages.admin.common.draft"),
            <div key={question.uuid} className="flex gap-2">
              <Button
                disabled={remove.isPending}
                onClick={() => edit(question)}
              >
                {t("pages.admin.common.edit")}
              </Button>
              <Button
                disabled={remove.isPending}
                onClick={() =>
                  remove.mutate({ type: "question", uuid: question.uuid })
                }
              >
                {t("pages.admin.common.delete")}
              </Button>
            </div>,
          ])}
          emptyMessage={t("pages.admin.common.empty")}
        />
      ) : null}
      {open && (
        <form
          onSubmit={submit}
          className="grid gap-4 rounded-tile border border-border bg-surface p-4"
        >
          <div className="grid gap-3 md:grid-cols-3">
            <label className="grid gap-1 text-sm font-bold">
              {t("pages.admin.game.bosses")}
              <select
                value={bossUuid}
                onChange={(event) => setBossUuid(event.target.value)}
                required
                className="min-h-10 rounded-control border border-border bg-background px-3"
              >
                <option value="" disabled />
                {bosses.data?.map((boss) => (
                  <option key={boss.uuid} value={boss.uuid}>
                    {boss.name.pl}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-1 text-sm font-bold">
              {t("pages.admin.game.questionType")}
              <select
                value={type}
                onChange={(event) =>
                  setType(event.target.value as GameQuestion["type"])
                }
                className="min-h-10 rounded-control border border-border bg-background px-3"
              >
                {["SINGLE_CHOICE", "TRUE_FALSE", "ORDER", "MATCHING"].map(
                  (value) => (
                    <option key={value}>{value}</option>
                  ),
                )}
              </select>
            </label>
            <label className="grid gap-1 text-sm font-bold">
              {t("pages.admin.game.category")}
              <input
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
                className="min-h-10 rounded-control border border-border bg-background px-3"
              />
            </label>
          </div>
          <TranslatedFields
            legend={t("pages.admin.game.question")}
            value={content}
            multiline
            onChange={setContent}
          />
          <TranslatedFields
            legend={t("pages.admin.game.explanation")}
            value={explanation}
            multiline
            onChange={setExplanation}
          />
          <div className="grid gap-3 md:grid-cols-3">
            <label className="grid gap-1 text-sm font-bold">
              {t("pages.admin.game.source")}
              <input
                type="url"
                value={sourceUrl}
                onChange={(event) => setSourceUrl(event.target.value)}
                required
                className="min-h-10 rounded-control border border-border bg-background px-3"
              />
            </label>
            <label className="grid gap-1 text-sm font-bold">
              {t("pages.admin.game.verifiedAt")}
              <input
                type="date"
                value={verifiedAt}
                onChange={(event) => setVerifiedAt(event.target.value)}
                required
                className="min-h-10 rounded-control border border-border bg-background px-3"
              />
            </label>
            <label className="grid gap-1 text-sm font-bold">
              {t("pages.admin.game.difficulty")}
              <input
                type="number"
                min={1}
                max={5}
                value={difficulty}
                onChange={(event) => setDifficulty(Number(event.target.value))}
                className="min-h-10 rounded-control border border-border bg-background px-3"
              />
            </label>
          </div>
          <fieldset className="grid gap-3 rounded-tile border border-border p-3">
            <legend className="px-2 text-sm font-black">
              {t("pages.admin.game.answers")}
            </legend>
            {answers.map((answer, index) => (
              <div
                key={index}
                className="grid gap-3 rounded-control border border-border bg-surface-inset p-3"
              >
                <TranslatedFields
                  legend={`${t("pages.admin.game.answer")} ${index + 1}`}
                  value={answer.content}
                  onChange={(contentValue) =>
                    updateAnswer(index, { ...answer, content: contentValue })
                  }
                />
                <div className="flex flex-wrap items-center gap-4">
                  {(type === "SINGLE_CHOICE" || type === "TRUE_FALSE") && (
                    <label className="flex gap-2 text-sm font-bold">
                      <input
                        type="radio"
                        name="correct"
                        checked={answer.isCorrect}
                        onChange={() =>
                          setAnswers((current) =>
                            current.map((item, itemIndex) => ({
                              ...item,
                              isCorrect: itemIndex === index,
                            })),
                          )
                        }
                      />
                      {t("pages.admin.game.correct")}
                    </label>
                  )}
                  {type === "MATCHING" && (
                    <input
                      placeholder={t("pages.admin.game.matchKey")}
                      value={answer.matchKey ?? ""}
                      onChange={(event) =>
                        updateAnswer(index, {
                          ...answer,
                          matchKey: event.target.value,
                        })
                      }
                      className="min-h-10 rounded-control border border-border bg-background px-3"
                    />
                  )}
                  <Button
                    disabled={answers.length <= 2}
                    onClick={() =>
                      setAnswers((current) =>
                        current.filter((_, itemIndex) => itemIndex !== index),
                      )
                    }
                  >
                    {t("pages.admin.common.delete")}
                  </Button>
                </div>
              </div>
            ))}
            <Button
              onClick={() => setAnswers((items) => [...items, emptyAnswer()])}
            >
              {t("pages.admin.game.addAnswer")}
            </Button>
          </fieldset>
          <label className="flex gap-2 text-sm font-bold">
            <input
              type="checkbox"
              checked={published}
              onChange={(event) => setPublished(event.target.checked)}
            />
            {t("pages.admin.common.published")}
          </label>
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
            <Button type="submit" variant="primary" disabled={save.isPending}>
              {t("pages.admin.common.save")}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
