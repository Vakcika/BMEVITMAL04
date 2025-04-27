import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "./ChartConfig";
import { chartColors } from "./ChartTheme";

interface MonthlyData {
  month: string;
  income: number;
  expense: number;
}

interface MonthlyIncomeExpenseChartProps {
  data: MonthlyData[];
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

export function MonthlyIncomeExpenseChart({
  data,
}: Readonly<MonthlyIncomeExpenseChartProps>) {
  const chartData = data.map((d) => ({
    ...d,
    month: monthNames[parseInt(d.month) - 1],
  }));

  const chartConfig: ChartConfig = {
    income: {
      label: "Income",
      color: chartColors.financial.income,
    },
    expense: {
      label: "Expense",
      color: chartColors.financial.expense,
    },
  };

  return (
    <ChartContainer config={chartConfig} className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
            tickFormatter={(value) =>
              value >= 1000000
                ? `${(value / 1000000).toFixed(1)}M`
                : value >= 1000
                ? `${(value / 1000).toFixed(0)}K`
                : value.toString()
            }
          />
          <Tooltip
            content={<ChartTooltipContent config={chartConfig} />}
            cursor={{ fill: chartColors.muted, opacity: 0.2 }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ paddingTop: 16, fontSize: 12 }}
          />
          <Bar
            dataKey="income"
            fill={chartConfig.income.color}
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
          <Bar
            dataKey="expense"
            fill={chartConfig.expense.color}
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
