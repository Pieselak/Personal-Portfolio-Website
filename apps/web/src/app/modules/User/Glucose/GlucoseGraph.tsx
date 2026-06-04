import { useTranslation } from "react-i18next";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGlucoseGraph } from "@/app/api/queries/useGlucose.ts";
import { GlucoseStatus } from "@/app/api/generated-api.ts";
import {
  formatGlucoseDate,
  getGlucoseColorClasses,
} from "@/app/modules/User/Glucose/Glucose.utils.ts";
import {
  GlucoseErrorState,
  GlucoseLoadingState,
  GlucoseMessageState,
} from "@/app/modules/User/Glucose/GlucoseStates.tsx";
import { motion } from "framer-motion";
import { Card } from "@/app/components/ui.tsx";

export function GlucoseGraph() {
  const { t, i18n } = useTranslation();
  const graphQuery = useGlucoseGraph();

  if (graphQuery.isLoading) return <GlucoseLoadingState />;

  if (graphQuery.isError || !graphQuery.data) {
    return <GlucoseErrorState message={t("pages.user.glucose.errors.graph")} />;
  }

  const graph = graphQuery.data;
  const points = graph.data
    .filter((point) => point.status === GlucoseStatus.Computable)
    .map((point) => ({
      ...point,
      timestampLabel: formatGlucoseDate(point.timestamp, i18n.language),
    }));

  if (points.length === 0) {
    return (
      <GlucoseMessageState message={t("pages.user.glucose.graph.empty")} />
    );
  }

  const unit = points[0].unit;
  const values = points.map((point) => point.value);
  const yMin = Math.max(0, Math.min(graph.levelLow, ...values) - 20);
  const yMax = Math.max(graph.levelHigh, ...values) + 20;
  const lineColor = getGlucoseColorClasses(points.at(-1)?.color).stroke;

  return (
    <motion.section
      className="space-y-5 rounded-lg border border-border bg-card p-6 shadow-sm md:p-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-semibold text-foreground">
          {t("pages.user.glucose.subpages.graph.title")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("pages.user.glucose.graph.range", {
            low: graph.targetLow,
            high: graph.targetHigh,
            unit,
          })}
        </p>
      </div>

      <Card className="h-80 w-full p-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={points}
            margin={{ top: 16, right: 12, left: -8, bottom: 8 }}
          >
            <defs>
              <linearGradient id="glucoseGraphFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={lineColor} stopOpacity={0.32} />
                <stop offset="95%" stopColor={lineColor} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--border)" strokeDasharray="3 6" />
            <ReferenceArea
              y1={graph.targetLow}
              y2={graph.targetHigh}
              fill="var(--green-bg)"
              fillOpacity={0.55}
            />
            <ReferenceLine
              y={graph.levelLow}
              stroke="var(--red-glucose)"
              strokeDasharray="5 5"
            />
            <ReferenceLine
              y={graph.levelHigh}
              stroke="var(--red-glucose)"
              strokeDasharray="5 5"
            />
            <XAxis
              dataKey="timestampLabel"
              minTickGap={32}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "var(--border)" }}
            />
            <YAxis
              domain={[yMin, yMax]}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "var(--border)" }}
              width={44}
            />
            <Tooltip
              cursor={{ stroke: "var(--ring)", strokeDasharray: "4 4" }}
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                color: "var(--foreground)",
              }}
              formatter={(value) => [
                `${value} ${unit}`,
                t("pages.user.glucose.graph.value"),
              ]}
              labelStyle={{ color: "var(--muted-foreground)" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={lineColor}
              strokeWidth={3}
              fill="url(#glucoseGraphFill)"
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0, fill: lineColor }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </motion.section>
  );
}
