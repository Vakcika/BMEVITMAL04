import React from "react";
import { format } from "date-fns";
import { Log } from "@/types/Logs";

interface LogFollowUpBadgeProps {
  log: Log;
}

const LogFollowUpBadge: React.FC<LogFollowUpBadgeProps> = ({ log }) => {
  if (!log.follow_up_date) return null;

  const getStatusInfo = () => {
    const today = new Date();
    const followUp = new Date(log.follow_up_date as string);

    // Calculate difference in days
    const diffTime = followUp.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      // Overdue
      return {
        color: "bg-red-100 text-red-800",
        status: "overdue",
      };
    } else if (diffDays === 0) {
      // Today
      return {
        color: "bg-blue-100 text-blue-800",
        status: "today",
      };
    } else if (diffDays <= 7) {
      // This week
      return {
        color: "bg-yellow-100 text-yellow-800",

        status: "this Week",
      };
    } else {
      // Later
      return {
        color: "bg-green-100 text-green-800",
        status: "later",
      };
    }
  };

  const formatDate = (date: string) => {
    return format(new Date(date), "MMM d, yyyy");
  };

  const statusInfo = getStatusInfo();

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full cursor-pointer ${statusInfo.color}`}
      title={`Follow-up ${statusInfo.status}`}
    >
      {formatDate(log.follow_up_date)}
    </span>
  );
};

export default LogFollowUpBadge;
