import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "./ChartConfig";
import { chartColors } from "./ChartTheme";

interface SubscriptionRateData {
  month: string;
  rate: number;
}

interface SubscriptionRateChartProps {
  data: SubscriptionRateData[] | [];
}

export function SubscriptionRateChart({
  data,
}: Readonly<SubscriptionRateChartProps>) {
  const sortedData = [...data].sort((a, b) => {
    const [aYear, aMonth] = a.month.split("-").map(Number);
    const [bYear, bMonth] = b.month.split("-").map(Number);
    return aYear === bYear ? aMonth - bMonth : aYear - bYear;
  });

  const chartConfig: ChartConfig = {
    rate: {
      label: "Subscription Rate",
      color: chartColors.primary[0],
    },
  };

  return (
    <ChartContainer config={chartConfig} className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={sortedData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={chartConfig.rate.color}
                stopOpacity={0.3}
              />
              <stop
                offset="95%"
                stopColor={chartConfig.rate.color}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={chartColors.border}
            vertical={false}
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            dy={10}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => {
              const month = value.split("-")[1];
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
              return monthNames[parseInt(month) - 1];
            }}
          />
          <YAxis
            tickFormatter={(value) => `${value}%`}
            tickLine={false}
            axisLine={false}
            dx={-10}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            content={<ChartTooltipContent config={chartConfig} hideLabel />}
          />
          <Area
            type="monotone"
            dataKey="rate"
            stroke={chartConfig.rate.color}
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRate)"
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
