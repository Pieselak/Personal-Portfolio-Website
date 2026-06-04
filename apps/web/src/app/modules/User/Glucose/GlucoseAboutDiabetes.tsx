import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export function GlucoseAboutDiabetes() {
  const { t } = useTranslation();

  const sections: string[] = [
    "pathophysiology",
    "diagnosisAndSymptoms",
    "treatment",
    "inheritance",
  ];
  const comparisonTableSections: string[] = [
    "feature",
    "mody2",
    "type1",
    "type2",
  ];
  const comparisonTableItems: string[] = [
    "age",
    "genetics",
    "bodyWeight",
    "insulinResistance",
    "antibodies",
    "insulinSecretion",
    "treatment",
  ];

  return (
    <motion.section
      className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-primary">
          {t("pages.user.glucose.subpages.aboutDiabetes.title")}
        </h2>
      </div>

      {sections.map((section, index) => (
        <motion.article
          key={section}
          className="w-full rounded-xl border border-border bg-muted/30 p-3"
          custom={index}
        >
          <h3 className={"mb-1 text-lg font-bold text-primary"}>
            {t(`pages.user.glucose.aboutDiabetes.sections.${section}.title`)}
          </h3>
          <p className={"text-sm text-muted-foreground"}>
            {t(`pages.user.glucose.aboutDiabetes.sections.${section}.content`)}
          </p>
        </motion.article>
      ))}
      <div className="w-full overflow-x-auto rounded-xl border border-border shadow-sm">
        <table className="w-full border-collapse text-left text-sm text-muted-foreground">
          <thead className="bg-muted/30 text-primary">
            <tr>
              {comparisonTableSections.map((section, key) => (
                <th
                  key={key}
                  className="whitespace-nowrap border-b border-border px-4 py-3 font-bold"
                >
                  {t(
                    `pages.user.glucose.aboutDiabetes.comparisonTable.header.${section}`,
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {comparisonTableItems.map((item) => (
              <tr key={item} className="transition-colors hover:bg-muted/20">
                {comparisonTableSections.map((section, sectionIndex) => (
                  <td
                    key={section}
                    // Pierwsza kolumna (opisowa) będzie nieco jaśniejsza i pogrubiona
                    className={`px-4 py-3 align-top ${
                      sectionIndex === 0 ? "font-semibold text-foreground" : ""
                    }`}
                  >
                    {t(
                      `pages.user.glucose.aboutDiabetes.comparisonTable.${item}.${section}`,
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
