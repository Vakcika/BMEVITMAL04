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

interface MonthlyData {
  month: string;
  income: number;
  expense: number;
}

interface Props {
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

export default function MonthlyIncomeExpenseChart({ data }: Readonly<Props>) {
  const chartData = data.map((d) => ({
    ...d,
    month: monthNames[parseInt(d.month) - 1],
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#34d399" name="Income" />
        <Bar dataKey="expense" fill="#f87171" name="Expense" />
      </BarChart>
    </ResponsiveContainer>
  );
}
