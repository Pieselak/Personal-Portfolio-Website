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
import { BentoTile } from "@/app/components/ui/BentoTile.tsx";
import { Notice } from "@/app/components/ui/Notice.tsx";
import { useGlucoseGraph } from "@/app/api/queries/useGlucose.ts";
import { GlucoseStatus } from "@/app/api/generated-api.ts";
import {
  GlucoseErrorState,
  GlucoseLoadingState,
  GlucoseMessageState,
} from "@/app/modules/User/Glucose/GlucoseStates.tsx";
import {
  getGlucoseRangeHours,
  type GlucoseTimeRange,
} from "@/app/modules/User/Glucose/constants/glucoseTimeRanges.ts";
import {
  formatGlucoseDate,
  formatPercent,
} from "@/app/modules/User/Glucose/utils/glucoseFormatters.ts";
import { getGlucoseColorClasses } from "@/app/modules/User/Glucose/utils/glucoseDisplay.ts";
import { PanelLoadingOverlay } from "@/app/modules/User/Glucose/components/PanelLoadingOverlay.tsx";

type GlucoseChartPanelProps = {
  selectedRange: GlucoseTimeRange;
};

export function GlucoseChartPanel({ selectedRange }: GlucoseChartPanelProps) {
  const { t, i18n } = useTranslation();
  const hours = getGlucoseRangeHours(selectedRange);
  const graphQuery = useGlucoseGraph(hours);

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
      <BentoTile
        title={t("pages.user.glucose.subpages.graph.title")}
        className="relative"
      >
        <PanelLoadingOverlay visible={graphQuery.isFetching} />
        <GlucoseMessageState message={t("pages.user.glucose.graph.empty")} />
      </BentoTile>
    );
  }

  const unit = points[0].unit;
  const lineColor = getGlucoseColorClasses(points.at(-1)?.color).stroke;
  const inRangeCount = points.filter(
    (point) =>
      point.value >= graph.targetLow && point.value <= graph.targetHigh,
  ).length;
  const inRangePercent = (inRangeCount / points.length) * 100;

  return (
    <BentoTile
      title={t("pages.user.glucose.subpages.graph.title")}
      description={t("pages.user.glucose.graph.range", {
        low: graph.targetLow,
        high: graph.targetHigh,
        unit,
      })}
      className="relative"
    >
      <PanelLoadingOverlay visible={graphQuery.isFetching} />
      <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
        <div className="h-88 rounded-tile border border-border bg-surface-inset p-3">
          <ResponsiveContainer
            initialDimension={{ width: 100, height: 100 }}
            width="100%"
            height="100%"
            minHeight={100}
          >
            <AreaChart
              data={points}
              margin={{ top: 18, right: 14, left: -8, bottom: 8 }}
            >
              <defs>
                <linearGradient
                  id="glucoseGraphFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={lineColor} stopOpacity={0.32} />
                  <stop offset="95%" stopColor={lineColor} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 8" />
              <ReferenceArea
                y1={graph.targetLow}
                y2={graph.targetHigh}
                fill="var(--green-bg)"
                fillOpacity={0.72}
              />
              <ReferenceLine
                y={graph.targetLow}
                label={{
                  value: `${graph.targetLow}`,
                  fill: "var(--green-fill)",
                  position: "insideTopRight",
                }}
                stroke="var(--green-fill)"
                strokeDasharray="5 5"
              />
              <ReferenceLine
                y={graph.targetHigh}
                label={{
                  value: `${graph.targetHigh}`,
                  fill: "var(--green-fill)",
                  position: "insideBottomRight",
                }}
                stroke="var(--green-fill)"
                strokeDasharray="5 5"
              />
              <ReferenceLine
                y={graph.levelLow}
                label={{
                  value: `${graph.levelLow}`,
                  fill: "var(--red-fill)",
                  position: "insideTopLeft",
                }}
                stroke="var(--red-fill)"
                strokeDasharray="4 6"
              />
              <ReferenceLine
                y={graph.levelHigh}
                label={{
                  value: `${graph.levelHigh}`,
                  fill: "var(--orange-fill)",
                  position: "insideBottomLeft",
                }}
                stroke="var(--orange-fill)"
                strokeDasharray="4 6"
              />
              <XAxis
                dataKey="timestampLabel"
                minTickGap={34}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
              />
              <YAxis
                domain={[0, 400]}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "var(--border)" }}
                width={44}
              />
              <Tooltip
                cursor={{ stroke: "var(--ring)", strokeDasharray: "4 4" }}
                contentStyle={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-tile)",
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
        </div>

        <div className="space-y-3">
          <Notice tone="green" title={t("pages.user.glucose.graph.targetZone")}>
            {t("pages.user.glucose.graph.inRangeSummary", {
              value: formatPercent(inRangePercent, i18n.language),
            })}
          </Notice>
          <div className="rounded-tile border border-border bg-surface-raised p-4 text-sm">
            <p className="font-black text-foreground">
              {t("pages.user.glucose.graph.referencePoints")}
            </p>
            <dl className="mt-3 grid gap-2 text-muted-foreground">
              <div className="flex justify-between gap-4">
                <dt>{t("pages.user.glucose.ranges.high")}</dt>
                <dd className="font-black text-orange-text">
                  {graph.levelHigh}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>{t("pages.user.glucose.ranges.inRange")}</dt>
                <dd className="font-black text-green-text">
                  {graph.targetLow}-{graph.targetHigh}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>{t("pages.user.glucose.ranges.low")}</dt>
                <dd className="font-black text-red-text">{graph.levelLow}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </BentoTile>
  );
}
