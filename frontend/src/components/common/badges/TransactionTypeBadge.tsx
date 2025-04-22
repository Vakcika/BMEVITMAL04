import { TransactionType } from "@/types/Transaction";
import React from "react";

interface TransactionTypeBadgeProps {
  type: TransactionType;
}

const TransactionTypeBadge: React.FC<TransactionTypeBadgeProps> = ({
  type,
}) => {
  const getStatusColor = () => {
    switch (type?.name?.toLowerCase()) {
      case "income":
        return "bg-green-100 text-green-800";
      case "expense":
        return "bg-red-100 text-red-800";
      default:
        return "bg-n100 text-n0";
    }
  };

  return type?.name ? (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor()}`}
    >
      {type.name}
    </span>
  ) : null;
};

export default TransactionTypeBadge;
