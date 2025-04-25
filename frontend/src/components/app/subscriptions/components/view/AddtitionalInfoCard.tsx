import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Detail from "@/components/common/details/Detail";
import { Subscription } from "@/types/Subscription";

export default function AdditionalInfoCard({
  subscription,
}: Readonly<{
  subscription: Subscription;
}>) {
  return (
    <Card className="bg-n0 rounded-lg shadow lg:col-span-2 xl:col-span-1">
      <CardHeader>
        <CardTitle>Additional Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Detail label="Subscription Name" value={subscription.name} />
          <Detail
            label="Billing Cycle"
            value={subscription.billing_cycle.name}
          />
          <Detail
            label="Duration"
            value={`${
              subscription.start_date
                ? new Date(subscription.start_date).toLocaleDateString()
                : "N/A"
            } to ${
              subscription.end_date
                ? new Date(subscription.end_date).toLocaleDateString()
                : "N/A"
            }`}
          />
        </div>
      </CardContent>
    </Card>
  );
}
