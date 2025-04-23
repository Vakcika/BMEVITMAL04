import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { DeleteActionButton } from "@/components/tables/actions/DeleteActionButton";
import CustomerStatusBadge from "@/components/common/badges/CustomerStatusBadge";

export default function ViewCustomerHeader({
  customer,
  onEdit,
  onDelete,
}: Readonly<{
  customer: Customer;
  onEdit: () => void;
  onDelete: (customer: Customer) => void;
}>) {
  return (
    <div className="mt-6 mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-semibold">{customer.company_name}</h1>
        <p className="text-n100">
          {customer.name} • <CustomerStatusBadge status={customer.status} />
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={onEdit}>
          <Edit className="w-6 h-6 mr-2" />
          Edit
        </Button>
        <DeleteActionButton
          item={customer}
          itemName="customer"
          itemLabel={customer.company_name}
          onDelete={() => onDelete(customer)}
          variant="lg"
        />
      </div>
    </div>
  );
}
