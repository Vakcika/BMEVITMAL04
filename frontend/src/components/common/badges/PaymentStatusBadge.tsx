import { Transaction } from "@/types/Transaction";
import React from "react";

interface PaymentStatusBadgeProps {
  transaction: Transaction;
}

const PaymentStatusBadge: React.FC<PaymentStatusBadgeProps> = ({
  transaction,
}) => {
  const getPaymentStatus = () => {
    if (transaction?.payment_date) {
      return { label: "Paid", className: "bg-green-100 text-green-800" };
    }

    if (transaction?.due_date) {
      const now = new Date();
      const dueDate = new Date(transaction.due_date);

      if (dueDate < now) {
        return { label: "Overdue", className: "bg-red-100 text-red-800" };
      } else {
        return { label: "N/A", className: "bg-gray-100 text-gray-800" };
      }
    }

    return { label: "Pending", className: "bg-yellow-100 text-yellow-800" };
  };
  const status = getPaymentStatus();
  return transaction?.amount ? (
    <span
      className={`mx-1.5 px-2 py-1 text-xs font-medium rounded-full ${status.className}`}
    >
      {status.label}
    </span>
  ) : null;
};

export default PaymentStatusBadge;
