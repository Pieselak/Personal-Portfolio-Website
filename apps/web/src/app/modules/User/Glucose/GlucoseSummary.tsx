import { BarChart3, TrendingUp, AlertCircle, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";

export function GlucoseSummary() {
  const { t } = useTranslation();

  const stats = [
    {
      title: "Średnia glikemia",
      value: "--",
      unit: "mg/dL",
      icon: BarChart3,
      color: "text-primary",
    },
    {
      title: "Trend",
      value: "--",
      unit: "mg/dL/min",
      icon: TrendingUp,
      color: "text-accent",
    },
    {
      title: "Zmienność",
      value: "--",
      unit: "%",
      icon: AlertCircle,
      color: "text-orange-500",
    },
    {
      title: "Czas aktualizacji",
      value: "--",
      unit: "min temu",
      icon: Clock,
      color: "text-muted-foreground",
    },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-primary">
          {t("pages.user.glucose.subpages.summary.title")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-muted/50 rounded-xl p-5 border border-border/50 hover:border-border hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    {stat.title}
                  </p>
                </div>
                <Icon size={20} className={stat.color} />
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.unit}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Historical Data Section */}
      <div className="mt-8 pt-6 border-t border-border">
        <h3 className="text-lg font-semibold text-primary mb-4">
          Dane historyczne
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted/50 rounded-xl p-5 border border-border/50">
            <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
              Dzisiaj
            </p>
            <p className="text-2xl font-bold text-primary">-- pomiarów</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-5 border border-border/50">
            <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
              Ten tydzień
            </p>
            <p className="text-2xl font-bold text-primary">-- pomiarów</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-5 border border-border/50">
            <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">
              Ten miesiąc
            </p>
            <p className="text-2xl font-bold text-primary">-- pomiarów</p>
          </div>
        </div>
      </div>
    </div>
  );
}
