import { useTranslation } from "react-i18next";
import { SegmentedControl } from "@/app/components/ui/SegmentedControl.tsx";
import {
  GLUCOSE_TIME_RANGES,
  GLUCOSE_TIME_RANGES_WITH_ALL,
  type GlucoseTimeRange,
} from "@/app/modules/User/Glucose/constants/glucoseTimeRanges.ts";

type TimeRangeSelectorProps = {
  value: GlucoseTimeRange;
  onChange: (range: GlucoseTimeRange) => void;
  includeAll?: boolean;
};

export function TimeRangeSelector({
  value,
  onChange,
  includeAll = false,
}: TimeRangeSelectorProps) {
  const { t } = useTranslation();
  const ranges = includeAll
    ? GLUCOSE_TIME_RANGES_WITH_ALL
    : GLUCOSE_TIME_RANGES;
  const options = ranges.map((range) => ({
    value: range,
    label: t(`pages.user.glucose.timeRange.${range}`, {
      defaultValue: range,
    }),
  }));

  return (
    <div className="block">
      <SegmentedControl<GlucoseTimeRange>
        ariaLabel={t("pages.user.glucose.timeRange.label", {
          defaultValue: "Glucose time range",
        })}
        value={value}
        onChange={onChange}
        options={options}
      />
    </div>
  );
}
