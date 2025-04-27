import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function DashboardCard({
  title,
  description,
  children,
  footer,
  className,
}: Readonly<DashboardCardProps>) {
  return (
    <Card className={cn("rounded-lg border shadow-sm h-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pb-2">{children}</CardContent>
      {footer && <CardFooter className="pt-2">{footer}</CardFooter>}
    </Card>
  );
}
