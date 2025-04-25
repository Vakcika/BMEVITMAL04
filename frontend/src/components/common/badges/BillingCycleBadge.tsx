import { BillingCycle } from "@/types/Subscription";
import React from "react";

interface BillingCycleBadgeProps {
  cycle: BillingCycle;
}

const BillingCycleBadge: React.FC<BillingCycleBadgeProps> = ({ cycle }) => {
  const getCycleColor = () => {
    switch (cycle?.name?.toLowerCase()) {
      case "monthly":
        return "bg-blue-100 text-blue-800";
      case "quarterly":
        return "bg-purple-100 text-purple-800";
      case "yearly":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-n100 text-n0";
    }
  };

  return cycle?.name ? (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${getCycleColor()}`}
    >
      {cycle.name}
    </span>
  ) : null;
};

export default BillingCycleBadge;
