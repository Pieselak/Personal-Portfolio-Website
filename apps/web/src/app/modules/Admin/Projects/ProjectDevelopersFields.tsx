import { useTranslation } from "react-i18next";
import type { ProjectDeveloperBody } from "@/app/api/generated-api.ts";
import { Button } from "@/app/components/ui/Button.tsx";

type ProjectDevelopersFieldsProps = {
  value: ProjectDeveloperBody[];
  onChange: (value: ProjectDeveloperBody[]) => void;
};

const emptyDeveloper = (): ProjectDeveloperBody => ({
  name: "",
  role: "",
  profileUrl: "",
});

export function ProjectDevelopersFields({
  value,
  onChange,
}: ProjectDevelopersFieldsProps) {
  const { t } = useTranslation();

  function updateDeveloper(
    index: number,
    field: keyof ProjectDeveloperBody,
    fieldValue: string,
  ) {
    onChange(
      value.map((developer, developerIndex) =>
        developerIndex === index
          ? { ...developer, [field]: fieldValue }
          : developer,
      ),
    );
  }

  return (
    <fieldset className="grid gap-3 rounded-tile border border-border p-3">
      <legend className="px-2 text-sm font-black">
        {t("pages.admin.projects.developers")}
      </legend>

      {value.length ? (
        <div className="grid gap-3">
          {value.map((developer, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-tile border border-border bg-surface-raised p-3 lg:grid-cols-[1fr_1fr_1.4fr_auto] lg:items-end"
            >
              <label className="grid gap-1 text-xs font-bold">
                {t("pages.admin.projects.developerName")}
                <input
                  value={developer.name}
                  onChange={(event) =>
                    updateDeveloper(index, "name", event.target.value)
                  }
                  required
                  className="min-h-10 rounded-control border border-border bg-background px-3 text-sm font-normal"
                />
              </label>
              <label className="grid gap-1 text-xs font-bold">
                {t("pages.admin.projects.developerRole")}
                <input
                  value={developer.role ?? ""}
                  onChange={(event) =>
                    updateDeveloper(index, "role", event.target.value)
                  }
                  className="min-h-10 rounded-control border border-border bg-background px-3 text-sm font-normal"
                />
              </label>
              <label className="grid gap-1 text-xs font-bold">
                {t("pages.admin.projects.developerProfileUrl")}
                <input
                  type="url"
                  value={developer.profileUrl ?? ""}
                  onChange={(event) =>
                    updateDeveloper(index, "profileUrl", event.target.value)
                  }
                  className="min-h-10 rounded-control border border-border bg-background px-3 text-sm font-normal"
                />
              </label>
              <Button
                type="button"
                onClick={() =>
                  onChange(
                    value.filter(
                      (_, developerIndex) => developerIndex !== index,
                    ),
                  )
                }
              >
                {t("pages.admin.projects.removeDeveloper")}
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          {t("pages.admin.projects.noDevelopers")}
        </p>
      )}

      <div>
        <Button
          type="button"
          onClick={() => onChange([...value, emptyDeveloper()])}
        >
          {t("pages.admin.projects.addDeveloper")}
        </Button>
      </div>
    </fieldset>
  );
}
