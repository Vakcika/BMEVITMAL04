import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { chartColors } from "./ChartTheme";

interface CustomerBalance {
  customer_id: string;
  customer_name: string;
  balance: number;
}

interface CustomerBalancesListProps {
  data: CustomerBalance[];
}

export function CustomerBalancesList({
  data,
}: Readonly<CustomerBalancesListProps>) {
  const sortedData = [...data].sort((a, b) => b.balance - a.balance);

  return (
    <div className="space-y-3 h-full overflow-auto pr-2">
      {sortedData.map((customer, index) => {
        const isPositive = customer.balance > 0;

        return (
          <div
            key={customer.customer_id}
            className="flex items-center justify-between py-2 border-b border-border last:border-0"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm"
                style={{
                  backgroundColor:
                    index < 3
                      ? [
                          chartColors.primary[0],
                          chartColors.primary[1],
                          chartColors.accent[0],
                        ][index]
                      : chartColors.textMuted,
                }}
              >
                {index + 1}
              </div>
              <span className="font-medium truncate max-w-[150px]">
                {customer.customer_name}
              </span>
            </div>
            <div
              className="flex items-center font-mono"
              style={{
                color: isPositive ? "#4ade80" : chartColors.financial.expense,
              }}
            >
              <span className="text-sm">
                {customer.balance.toLocaleString("hu-HU", {
                  style: "currency",
                  currency: "HUF",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
              {isPositive ? (
                <ArrowUpRight className="h-4 w-4 ml-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 ml-1" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
