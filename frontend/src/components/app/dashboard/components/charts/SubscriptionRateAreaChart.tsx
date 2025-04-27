import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SubscriptionRateData {
  month: string;
  rate: number;
}

export function SubscriptionRateChart({
  data,
}: Readonly<{
  data: SubscriptionRateData[];
}>) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          tickFormatter={(value) => `${value}%`}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "#fff",
            border: "none",
            borderRadius: "8px",
          }}
          formatter={(value: number) => [`${value.toFixed(1)}%`, "Rate"]}
        />
        <Area
          type="monotone"
          dataKey="rate"
          stroke="#4f46e5"
          fillOpacity={1}
          fill="url(#colorRate)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
