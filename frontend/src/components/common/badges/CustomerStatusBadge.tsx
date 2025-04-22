import React from "react";

interface CustomerStatusBadgeProps {
  status: CustomerStatus;
}

const CustomerStatusBadge: React.FC<CustomerStatusBadgeProps> = ({
  status,
}) => {
  const getStatusColor = () => {
    switch (status?.name?.toLowerCase()) {
      case "outreached":
        return "bg-orange-100 text-orange-800";
      case "meeting scheduled":
        return "bg-blue-100 text-blue-800";
      case "offer sent":
        return "bg-gray-100 text-gray-800";
      case "in progress":
        return "bg-purple-100 text-purple-800";
      case "loyal customer":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-n100 text-n0";
    }
  };

  return status?.name ? (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor()}`}
    >
      {status.name}
    </span>
  ) : null;
};

export default CustomerStatusBadge;
