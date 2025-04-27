import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#34d399", "#60a5fa", "#f87171", "#facc15", "#a78bfa"];

interface Props {
  data: Record<string, number>;
}

export default function CompanyBalancePieChart({ data }: Readonly<Props>) {
  const pieData = Object.entries(data).map(([currency, amount]) => ({
    name: currency,
    value: amount,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {pieData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
