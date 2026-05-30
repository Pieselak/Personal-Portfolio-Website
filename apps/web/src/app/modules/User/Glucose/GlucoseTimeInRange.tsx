import { Target, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export function GlucoseTimeInRange() {
  const { t } = useTranslation();

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-primary">
          {t("pages.user.glucose.subpages.timeInRange.title")}
        </h2>
      </div>

      {/* Main Progress Circle */}
      <div className="bg-muted/50 rounded-xl p-8 border border-border/50">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-48 h-48">
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
                strokeWidth="3"
                className="text-border opacity-30"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="212.12 282.74"
                className="text-accent transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-accent">--</div>
                <div className="text-sm text-muted-foreground">%</div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-primary mb-1">
              -- godzin w normie
            </p>
            <p className="text-sm text-muted-foreground">Cel: 70% dziennie</p>
          </div>
        </div>
      </div>

      {/* Range Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* In Range */}
        <div className="bg-green-500/10 rounded-xl p-5 border border-green-500/30 hover:border-green-500/50 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-green-700 dark:text-green-400 uppercase tracking-wide">
              W normie
            </span>
            <Target size={20} className="text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            --%
          </p>
          <p className="text-xs text-green-600/70 dark:text-green-400/70 mt-2">
            70-180 mg/dL
          </p>
        </div>

        {/* High */}
        <div className="bg-orange-500/10 rounded-xl p-5 border border-orange-500/30 hover:border-orange-500/50 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-orange-700 dark:text-orange-400 uppercase tracking-wide">
              Za wysoko
            </span>
            <TrendingUp size={20} className="text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
            --%
          </p>
          <p className="text-xs text-orange-600/70 dark:text-orange-400/70 mt-2">
            Ponad 180 mg/dL
          </p>
        </div>

        {/* Low */}
        <div className="bg-red-500/10 rounded-xl p-5 border border-red-500/30 hover:border-red-500/50 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-red-700 dark:text-red-400 uppercase tracking-wide">
              Za nisko
            </span>
            <TrendingDown size={20} className="text-red-500" />
          </div>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">
            --%
          </p>
          <p className="text-xs text-red-600/70 dark:text-red-400/70 mt-2">
            Poniżej 70 mg/dL
          </p>
        </div>

        {/* Very Low */}
        <div className="bg-destructive/10 rounded-xl p-5 border border-destructive/30 hover:border-destructive/50 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-destructive uppercase tracking-wide">
              Bardzo nisko
            </span>
            <AlertCircle size={20} className="text-destructive" />
          </div>
          <p className="text-3xl font-bold text-destructive">--%</p>
          <p className="text-xs text-destructive/70 mt-2">Poniżej 54 mg/dL</p>
        </div>
      </div>

      {/* Daily Activity */}
      <div className="bg-muted/50 rounded-xl p-6 border border-border/50">
        <h3 className="text-lg font-semibold text-primary mb-4">
          Godzinowa analiza
        </h3>
        <div className="space-y-3">
          {[
            "00:00 - 06:00",
            "06:00 - 12:00",
            "12:00 - 18:00",
            "18:00 - 24:00",
          ].map((period, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  {period}
                </span>
                <span className="text-sm font-semibold text-primary">--</span>
              </div>
              <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                <div
                  className="bg-accent h-full rounded-full transition-all duration-300"
                  style={{ width: "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
