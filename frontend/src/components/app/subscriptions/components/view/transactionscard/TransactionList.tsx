import { Transaction } from "@/types/Transaction";
import { Subscription } from "@/types/Subscription";
import { useNavigate } from "react-router-dom";
import TransactionListItem from "./TranactionListItem";

interface TransactionListProps {
  transactions: Transaction[];
  subscription: Subscription;
}

export default function TransactionList({
  transactions,
  subscription,
}: Readonly<TransactionListProps>) {
  const navigate = useNavigate();

  const handleCreateTransaction = (dueDate: string) => {
    navigate(`/app/transaction/new`, {
      state: {
        subscription: subscription.id,
        dueDate,
        amount: subscription.amount,
        customer: subscription.customer.id,
        currency: subscription.currency.id,
      },
    });
  };

  const handleViewTransaction = (tx: Transaction) => {
    // Only navigate if it's a real transaction
    if (!tx.id.toString().startsWith("mock-tx")) {
      navigate(`/app/transaction/${tx.id}`);
    } else {
      // For mock transactions, redirect to create with prefilled data
      handleCreateTransaction(tx.due_date ?? "");
    }
  };

  return (
    <ul className="divide-y">
      {transactions.map((transaction) => (
        <TransactionListItem
          key={transaction.id.toString()}
          transaction={transaction}
          subscription={subscription}
          onCreateTransaction={handleCreateTransaction}
          onViewTransaction={handleViewTransaction}
        />
      ))}
    </ul>
  );
}
