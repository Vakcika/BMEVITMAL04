import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface CustomerCountData {
  month: string;
  count: number;
}

interface Props {
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

export default function CustomerCountChart({ data }: Readonly<Props>) {
  const chartData = data.map((d) => ({
    ...d,
    month: monthNames[parseInt(d.month) - 1],
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#60a5fa"
          name="New Customers"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
