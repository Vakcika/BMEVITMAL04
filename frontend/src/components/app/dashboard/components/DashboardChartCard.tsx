import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  title: string;
  children: React.ReactNode;
  height?: number;
}

export default function DashboardChartCard({
  title,
  children,
  height = 300,
}: Readonly<Props>) {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height }}>{children}</div>
      </CardContent>
    </Card>
  );
}
