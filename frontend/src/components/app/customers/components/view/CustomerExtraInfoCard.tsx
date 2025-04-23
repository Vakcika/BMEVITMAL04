import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Detail from "@/components/common/details/Detail";

export default function CustomerExtraInfoCard({
  customer,
}: Readonly<{
  customer: Customer;
}>) {
  return (
    <Card className="bg-n0 rounded-lg shadow lg:col-span-2 xl:col-span-1">
      <CardHeader>
        <CardTitle>Additional Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Detail label="Address" value={customer.address ?? "N/A"} />
          <Detail
            label="Description"
            value={customer.description ?? "No description provided."}
          />
        </div>
      </CardContent>
    </Card>
  );
}
