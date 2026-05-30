import { useTranslation } from "react-i18next";
import { CloudAlert, CloudSync, TrendingUp } from "lucide-react";

export function GlucoseCurrent() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6 w-full bg-card border border-border rounded-2xl p-6">
      {/* Sync Status */}
      <div className="flex justify-end">
        <div className="relative group flex gap-2 items-center text-muted-foreground text-sm font-medium cursor-pointer hover:text-accent-foreground transition-colors">
          <CloudSync size={18} className="animate-spin" />
          <span className="hidden sm:inline">Synchronizacja...</span>
          <div className="absolute top-full right-0 mt-2 z-10 hidden group-hover:block w-max rounded-lg bg-muted border border-ring px-3 py-2 text-xs text-muted-foreground shadow-md">
            {t("user.myGlucosePage.nextSyncIn")}
          </div>
        </div>
      </div>

      {/* Main Glucose Display */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        {/* Left: Large Display */}
        <div className="flex flex-col items-center gap-4 flex-1">
          <div className="relative w-40 h-40 md:w-48 md:h-48">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-border opacity-30"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="212 282"
                className="text-accent transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-primary">
                  ---
                </div>
                <div className="text-sm text-muted-foreground mt-1">mg/dL</div>
              </div>
            </div>
          </div>
          <div className="text-center space-y-1">
            <p className="text-lg font-semibold text-primary">Nie podłączony</p>
            <p className="text-sm text-muted-foreground">Czekam na dane</p>
          </div>
        </div>

        {/* Right: Stats */}
        <div className="grid grid-cols-2 gap-4 flex-1 w-full">
          {/* Trend */}
          <div className="bg-muted/50 rounded-xl p-4 border border-border/50 hover:border-border transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Trend
              </span>
              <TrendingUp size={16} className="text-accent" />
            </div>
            <p className="text-2xl font-bold text-primary">--</p>
            <p className="text-xs text-muted-foreground mt-1">mg/dL/min</p>
          </div>

          {/* Average */}
          <div className="bg-muted/50 rounded-xl p-4 border border-border/50 hover:border-border transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Średnia
              </span>
              <TrendingUp size={16} className="text-primary" />
            </div>
            <p className="text-2xl font-bold text-primary">--</p>
            <p className="text-xs text-muted-foreground mt-1">Ostatnie 24h</p>
          </div>

          {/* Range */}
          <div className="bg-muted/50 rounded-xl p-4 border border-border/50 hover:border-border transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Zakres
              </span>
              <CloudAlert size={16} className="text-destructive" />
            </div>
            <p className="text-2xl font-bold text-primary">--</p>
            <p className="text-xs text-muted-foreground mt-1">Min/Max</p>
          </div>

          {/* Status */}
          <div className="bg-muted/50 rounded-xl p-4 border border-border/50 hover:border-border transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Status
              </span>
              <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
            </div>
            <p className="text-2xl font-bold text-destructive">Błąd</p>
            <p className="text-xs text-muted-foreground mt-1">Bez połączenia</p>
          </div>
        </div>
      </div>
    </div>
  );
}
