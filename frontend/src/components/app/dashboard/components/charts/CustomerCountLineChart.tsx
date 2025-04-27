import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "./ChartConfig";
import { chartColors } from "./ChartTheme";

interface CustomerCountData {
  month: string;
  count: number;
}

interface CustomerCountChartProps {
  data: CustomerCountData[];
}

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function CustomerCountChart({
  data,
}: Readonly<CustomerCountChartProps>) {
  const chartData = data.map((d) => ({
    ...d,
    month: monthNames[parseInt(d.month) - 1],
  }));

  const chartConfig: ChartConfig = {
    count: {
      label: "New Customers",
      color: chartColors.primary[0],
    },
  };

  // Find average count for reference line
  const avgCount =
    chartData.reduce((acc, curr) => acc + curr.count, 0) / chartData.length;

  return (
    <ChartContainer config={chartConfig} className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={chartColors.border}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            dy={10}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            dx={-10}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<ChartTooltipContent config={chartConfig} />} />
          <ReferenceLine
            y={avgCount}
            stroke={chartColors.financial.neutral}
            strokeDasharray="3 3"
            label={{
              value: "Avg",
              position: "right",
              fill: chartColors.textMuted,
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke={chartConfig.count.color}
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2, fill: chartColors.background }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
