import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CustomerBalance {
  customer_id: string;
  customer_name: string;
  balance: number;
}

export function CustomerBalancesList({
  data,
}: Readonly<{ data: CustomerBalance[] }>) {
  const sortedData = [...data].sort((a, b) => b.balance - a.balance);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Customer Balances</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedData.map((customer) => (
          <div
            key={customer.customer_id}
            className="flex justify-between items-center"
          >
            <span className="font-medium">{customer.customer_name}</span>
            <span className="font-mono">
              {customer.balance.toLocaleString("hu-HU", {
                style: "currency",
                currency: "HUF",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
