import { ResponsiveContainer, Pie, Cell, Tooltip, PieChart } from "recharts";

const STATUS_COLORS: Record<string, string> = {
  outreached: "#fb923c",
  "meeting scheduled": "#60a5fa",
  "offer sent": "#6b7280",
  "in progress": "#a78bfa",
  "loyal customer": "#4ade80",
  failed: "#f87171",
};

export function CustomerStatusPieChart({
  data,
}: Readonly<{
  data: Array<{ name: string; count: number }>;
}>) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="count" nameKey="name" outerRadius={80} label>
          {data.map((entry) => (
            <Cell
              key={entry.name}
              fill={STATUS_COLORS[entry.name.toLowerCase()] || "#94a3b8"}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
