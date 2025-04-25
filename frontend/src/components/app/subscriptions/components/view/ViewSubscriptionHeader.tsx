import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { DeleteActionButton } from "@/components/tables/actions/DeleteActionButton";
import { Subscription } from "@/types/Subscription";
import BillingCycleBadge from "@/components/common/badges/BillingCycleBadge";

export default function ViewSubscriptionHeader({
  subscription,
  onEdit,
  onDelete,
}: Readonly<{
  subscription: Subscription;
  onEdit: () => void;
  onDelete: (subscription: Subscription) => void;
}>) {
  return (
    <div className="mt-6 mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-semibold">
          Subscription: #{subscription.id}
        </h1>
        <p className="text-n100">
          {subscription.customer?.company_name} • {subscription.name} •{" "}
          <BillingCycleBadge cycle={subscription.billing_cycle} />
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={onEdit}>
          <Edit className="w-6 h-6 mr-2" />
          Edit
        </Button>
        <DeleteActionButton
          item={subscription}
          itemName="subscription"
          itemLabel={`Subscription #${subscription.id}`}
          onDelete={onDelete}
          variant="lg"
        />
      </div>
    </div>
  );
}
