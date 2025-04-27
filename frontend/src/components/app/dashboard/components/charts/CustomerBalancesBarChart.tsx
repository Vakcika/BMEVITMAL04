import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
} from "recharts";

interface CustomerBalance {
  customer_id: string;
  customer_name: string;
  balance: number;
}

export default function CustomerBalancesChart({
  data,
}: Readonly<{
  data: CustomerBalance[];
}>) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis
          dataKey="customer_name"
          tick={{ fontSize: 12 }}
          angle={-45}
          textAnchor="end"
        />
        <YAxis />
        <Tooltip />
        <Bar dataKey="balance" fill="#4f46e5" name="Balance" maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
}
