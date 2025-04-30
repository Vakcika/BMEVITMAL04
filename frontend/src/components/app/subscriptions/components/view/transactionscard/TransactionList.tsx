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

  const handleCreateTransaction = () => {
    navigate(
      `/app/transaction/new?$&customer=${subscription.customer.id}$&currency=${subscription.currency.code}&transactionTypeId=1$&subscription=${subscription.id}&amount=${subscription.amount}`
    );
  };

  const handleViewTransaction = (tx: Transaction) => {
    // Only navigate if it's a real transaction
    if (!tx.id.toString().startsWith("mock-tx")) {
      navigate(`/app/transaction/${tx.id}`);
    } else {
      // For mock transactions, redirect to create with prefilled data
      handleCreateTransaction();
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
