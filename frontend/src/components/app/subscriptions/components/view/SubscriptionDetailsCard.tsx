import {
  Building,
  Calendar,
  DollarSign,
  CreditCard,
  Clock,
  CalendarClock,
  Repeat,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DetailWithIcon from "@/components/common/details/DetailWithIcon";
import { Subscription } from "@/types/Subscription";

export default function SubscriptionDetailsCard({
  subscription,
}: Readonly<{
  subscription: Subscription;
}>) {
  return (
    <Card className="bg-n0 rounded-lg shadow lg:col-span-2">
      <CardHeader>
        <CardTitle>Subscription Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DetailWithIcon
            icon={<Building className="w-6 h-6 text-n100" />}
            label="Customer"
            value={subscription.customer?.company_name ?? "N/A"}
          />
          <DetailWithIcon
            icon={<Repeat className="w-6 h-6 text-n100" />}
            label="Billing Cycle"
            value={subscription.billing_cycle?.name ?? "N/A"}
          />
          <DetailWithIcon
            icon={<Calendar className="w-6 h-6 text-n100" />}
            label="Start Date"
            value={
              subscription.start_date
                ? new Date(subscription.start_date).toLocaleDateString()
                : "N/A"
            }
          />
          <DetailWithIcon
            icon={<Calendar className="w-6 h-6 text-n100" />}
            label="End Date"
            value={
              subscription.end_date
                ? new Date(subscription.end_date).toLocaleDateString()
                : "N/A"
            }
          />
          <DetailWithIcon
            icon={<DollarSign className="w-6 h-6 text-n100" />}
            label="Amount"
            value={`${
              subscription.currency?.symbol ?? ""
            } ${subscription.amount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
          />
          <DetailWithIcon
            icon={<CreditCard className="w-6 h-6 text-n100" />}
            label="Currency"
            value={subscription.currency?.code ?? "N/A"}
          />
          <DetailWithIcon
            icon={<CalendarClock className="w-6 h-6 text-n100" />}
            label="Created At"
            value={
              subscription.created_at
                ? new Date(subscription.created_at).toLocaleString()
                : "N/A"
            }
          />
          <DetailWithIcon
            icon={<Clock className="w-6 h-6 text-n100" />}
            label="Updated At"
            value={
              subscription.updated_at
                ? new Date(subscription.updated_at).toLocaleString()
                : "N/A"
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
