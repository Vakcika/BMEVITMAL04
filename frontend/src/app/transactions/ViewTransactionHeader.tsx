import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import PaymentStatusBadge from "@/components/common/badges/PaymentStatusBadge";
import { DeleteActionButton } from "@/components/tables/actions/DeleteActionButton";
import { Transaction } from "@/types/Transaction";

export default function ViewTransactionHeader({
  transaction,
  onEdit,
  onDelete,
}: Readonly<{
  transaction: Transaction;
  onEdit: () => void;
  onDelete: (transaction: Transaction) => void;
}>) {
  return (
    <div className="mt-6 mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-semibold">
          Transaction: #{transaction.id.substring(0, 8)}
        </h1>
        <p className="text-n100">
          {transaction.customer?.company_name} •{" "}
          <PaymentStatusBadge transaction={transaction} />
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button onClick={onEdit}>
          <Edit className="w-6 h-6 mr-2" />
          Edit
        </Button>
        <DeleteActionButton
          item={transaction}
          itemName="transaction"
          itemLabel={`Transaction #${transaction.id.substring(0, 8)}`}
          onDelete={onDelete}
          variant="lg"
        />
      </div>
    </div>
  );
}
