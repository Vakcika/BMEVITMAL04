import { Transaction } from "@/types/Transaction";
import { Subscription } from "@/types/Subscription";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle2, Clock, AlertCircle, Eye } from "lucide-react";
import { format } from "date-fns";

interface TransactionListItemProps {
  transaction: Transaction;
  subscription: Subscription;
  onCreateTransaction: () => void;
  onViewTransaction: (transaction: Transaction) => void;
}

export default function TransactionListItem({
  transaction: tx,
  subscription,
  onCreateTransaction,
  onViewTransaction,
}: Readonly<TransactionListItemProps>) {
  const isMock = tx.id.toString().startsWith("mock-tx");
  const status = getTransactionStatus(tx);

  // For display, use transaction date if available, otherwise use due date
  const displayDate = tx.transaction_date
    ? new Date(tx.transaction_date)
    : tx.due_date
    ? new Date(tx.due_date)
    : null;

  // Determine transaction status label
  const getStatusLabel = () => {
    if (!isMock) {
      return <span className="ml-1 font-medium text-primary">• Recorded</span>;
    }

    if (status === "overdue") {
      return <span className="ml-1 font-medium text-red-500">• Missing</span>;
    }

    return <span className="ml-1 font-medium text-amber-500">• Upcoming</span>;
  };

  return (
    <li className="p-3 hover:bg-muted/50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {status === "paid" ? (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          ) : status === "overdue" ? (
            <AlertCircle className="h-4 w-4 text-red-500" />
          ) : (
            <Clock className="h-4 w-4 text-amber-500" />
          )}
          <div>
            <div className="font-medium">
              {displayDate ? format(displayDate, "MMM d, yyyy") : "No date"}
            </div>
            <div className="text-xs text-muted-foreground">
              {tx.note ?? "Subscription payment"}
              {getStatusLabel()}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium">
            {subscription.currency.symbol}
            {(isMock ? subscription.amount : tx.amount).toFixed(2)}
          </span>

          {isMock ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onCreateTransaction()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onViewTransaction(tx)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

// Helper function to determine transaction status
function getTransactionStatus(tx: Transaction) {
  // Consider a transaction paid if payment_date is set
  if (tx.payment_date) return "paid";

  const dueDate = tx.due_date ? new Date(tx.due_date) : null;
  return dueDate && dueDate < new Date() ? "overdue" : "pending";
}
