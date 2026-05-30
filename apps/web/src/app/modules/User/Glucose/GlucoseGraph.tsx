import { Calendar, Download, ZoomIn } from "lucide-react";
import { useTranslation } from "react-i18next";

export function GlucoseGraph() {
  const { t } = useTranslation();

  const timeRanges = ["24h", "7d", "30d", "90d"];

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-primary">
          {t("pages.user.glucose.subpages.graph.title")}
        </h2>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-muted/50 p-4 rounded-xl border border-border/50">
        <div className="flex gap-2 flex-wrap">
          {timeRanges.map((range) => (
            <button
              key={range}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                range === "24h"
                  ? "bg-accent/20 border border-accent text-accent"
                  : "bg-muted border border-border/50 text-muted-foreground hover:bg-border hover:border-border"
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted border border-border/50 text-muted-foreground hover:bg-border transition-colors text-sm font-medium">
            <Calendar size={16} />
            <span className="hidden sm:inline">Zakres</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted border border-border/50 text-muted-foreground hover:bg-border transition-colors text-sm font-medium">
            <Download size={16} />
            <span className="hidden sm:inline">Pobierz</span>
          </button>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-muted/50 rounded-xl p-8 border border-border/50 h-96 flex flex-col items-center justify-center">
        <ZoomIn size={48} className="text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground text-center">
          Czekam na dane z urządzenia
        </p>
        <p className="text-sm text-muted-foreground/70 mt-2">
          Wykres zostanie wyświetlony po synchronizacji
        </p>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm font-medium text-muted-foreground">
              Norma
            </span>
          </div>
          <p className="text-xs text-muted-foreground">70-180 mg/dL</p>
        </div>
        <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-sm font-medium text-muted-foreground">
              Wysoko
            </span>
          </div>
          <p className="text-xs text-muted-foreground">&gt; 180 mg/dL</p>
        </div>
        <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-sm font-medium text-muted-foreground">
              Nisko
            </span>
          </div>
          <p className="text-xs text-muted-foreground">&lt; 70 mg/dL</p>
        </div>
        <div className="bg-muted/50 rounded-xl p-4 border border-border/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-sm font-medium text-muted-foreground">
              Bardzo nisko
            </span>
          </div>
          <p className="text-xs text-muted-foreground">&lt; 54 mg/dL</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="bg-muted/50 rounded-xl p-5 border border-border/50">
          <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
            Średnia
          </p>
          <p className="text-2xl font-bold text-primary">-- mg/dL</p>
        </div>
        <div className="bg-muted/50 rounded-xl p-5 border border-border/50">
          <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
            Min
          </p>
          <p className="text-2xl font-bold text-primary">-- mg/dL</p>
        </div>
        <div className="bg-muted/50 rounded-xl p-5 border border-border/50">
          <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
            Max
          </p>
          <p className="text-2xl font-bold text-primary">-- mg/dL</p>
        </div>
      </div>
    </div>
  );
}
