import type { TranslatedText } from "@/app/api/admin.types.ts";

type TranslatedFieldsProps = {
  legend: string;
  value: TranslatedText;
  multiline?: boolean;
  onChange: (value: TranslatedText) => void;
};

const languages = ["pl", "en", "de"] as const;

export function TranslatedFields({
  legend,
  value,
  multiline = false,
  onChange,
}: TranslatedFieldsProps) {
  return (
    <fieldset className="grid gap-3 rounded-tile border border-border p-3">
      <legend className="px-2 text-sm font-black">{legend}</legend>
      <div className="grid gap-3 md:grid-cols-3">
        {languages.map((language) => (
          <label key={language} className="grid gap-1 text-xs font-bold">
            <span className="uppercase text-muted-foreground">{language}</span>
            {multiline ? (
              <textarea
                value={value[language]}
                onChange={(event) =>
                  onChange({ ...value, [language]: event.target.value })
                }
                rows={4}
                required
                className="rounded-control border border-border bg-background px-3 py-2 text-sm font-normal"
              />
            ) : (
              <input
                value={value[language]}
                onChange={(event) =>
                  onChange({ ...value, [language]: event.target.value })
                }
                required
                className="min-h-10 rounded-control border border-border bg-background px-3 text-sm font-normal"
              />
            )}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
