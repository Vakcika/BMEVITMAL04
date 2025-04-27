import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function DashboardCard({ title, children }: Readonly<Props>) {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
