import { useCallback } from "react";
import { Transaction } from "@/types/Transaction";
import { Subscription } from "@/types/Subscription";
import { UUID } from "crypto";
import { endOfMonth, endOfQuarter, getMonth } from "date-fns";

export function useGenerateTransactions() {
  const getLastDayOfBillingCycle = useCallback(
    (startDate: Date, cycleIndex: number, cycleName: string): Date => {
      const date = new Date(startDate);

      switch (cycleName.toLowerCase()) {
        case "monthly":
          return endOfMonth(
            new Date(date.getFullYear(), date.getMonth() + cycleIndex)
          );

        case "quarterly": {
          const quarterStartMonth = Math.floor(date.getMonth() / 3) * 3;
          const targetMonth = quarterStartMonth + cycleIndex * 3;
          return endOfQuarter(new Date(date.getFullYear(), targetMonth));
        }

        case "yearly": {
          const yearlyDate = new Date(date);
          yearlyDate.setFullYear(yearlyDate.getFullYear() + cycleIndex);
          yearlyDate.setMonth(0);
          return new Date(yearlyDate.getFullYear(), 0, 31);
        }

        default:
          return endOfMonth(date);
      }
    },
    []
  );

  const getQuarterFromDate = useCallback((date: Date): number => {
    return Math.floor(getMonth(date) / 3) + 1;
  }, []);

  const determineTransactionCycle = useCallback(
    (
      tx: Transaction,
      billingCycle: string,
      selectedYear: number
    ): number | null => {
      if (!tx.transaction_date && !tx.payment_date) return null;

      const dateToUse = tx.transaction_date
        ? new Date(tx.transaction_date)
        : new Date(tx.payment_date!);

      if (dateToUse.getFullYear() !== selectedYear) return null;

      switch (billingCycle.toLowerCase()) {
        case "monthly":
          return getMonth(dateToUse);
        case "quarterly":
          return getQuarterFromDate(dateToUse) - 1;
        case "yearly":
          return 0;
        default:
          return null;
      }
    },
    [getQuarterFromDate]
  );

  const generateTransactionsForYear = useCallback(
    (
      subscription: Subscription,
      user: User,
      existingTransactions: Transaction[],
      selectedYear: number
    ): Transaction[] => {
      const transactions: Transaction[] = [];
      const endDate = subscription.end_date
        ? new Date(subscription.end_date)
        : null;
      const startDate = new Date(subscription.start_date);

      const effectiveStartDate = new Date(startDate);
      if (startDate.getFullYear() < selectedYear) {
        effectiveStartDate.setFullYear(selectedYear, 0, 1);
      } else {
        effectiveStartDate.setFullYear(selectedYear);
      }

      let count = 0;
      const cycleName = subscription.billing_cycle.name.toLowerCase();

      if (cycleName === "monthly") {
        const endMonth =
          endDate?.getFullYear() === selectedYear ? endDate.getMonth() : 11;
        const startMonth = effectiveStartDate.getMonth();
        count = endMonth >= startMonth ? endMonth - startMonth + 1 : 0;
      } else if (cycleName === "quarterly") {
        const startQuarter = Math.floor(effectiveStartDate.getMonth() / 3);
        let endQuarter = 3;
        if (endDate?.getFullYear() === selectedYear) {
          endQuarter = Math.floor(endDate.getMonth() / 3);
        }
        count = endQuarter >= startQuarter ? endQuarter - startQuarter + 1 : 0;
      } else if (cycleName === "yearly") {
        const isActiveInYear = !(
          (endDate && endDate.getFullYear() < selectedYear) ||
          startDate.getFullYear() > selectedYear
        );
        count = isActiveInYear ? 1 : 0;
      }

      const yearTransactions = existingTransactions.filter((tx) => {
        const txDate = tx.transaction_date
          ? new Date(tx.transaction_date)
          : tx.payment_date
          ? new Date(tx.payment_date)
          : null;
        return txDate?.getFullYear() === selectedYear;
      });

      const existingTransactionCycles = new Map<number, Transaction>();
      yearTransactions.forEach((tx) => {
        const cycle = determineTransactionCycle(tx, cycleName, selectedYear);
        if (cycle !== null) existingTransactionCycles.set(cycle, tx);
      });

      for (let i = 0; i < count; i++) {
        const dueDate = getLastDayOfBillingCycle(
          effectiveStartDate,
          i,
          cycleName
        );

        if (endDate && dueDate > endDate && !existingTransactionCycles.has(i)) {
          continue;
        }

        const existingTransaction = existingTransactionCycles.get(i);

        if (existingTransaction) {
          const txCopy = { ...existingTransaction };
          txCopy.due_date ??= dueDate.toISOString();
          transactions.push(txCopy);
        } else {
          transactions.push({
            id: `mock-tx-${subscription.id}-${i}` as UUID,
            customer: subscription.customer,
            currency: subscription.currency,
            transaction_type: { id: 1, name: "Income" },
            subscription,
            created_by: user,
            amount: subscription.amount,
            amount_in_base: subscription.amount,
            transaction_date: null,
            due_date: dueDate.toISOString(),
            payment_date: null,
            note: `${subscription.name} payment (${i + 1}/${count})`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        }
      }

      yearTransactions.forEach((tx) => {
        const cycle = determineTransactionCycle(tx, cycleName, selectedYear);
        if (cycle === null) transactions.push(tx);
      });

      return transactions.sort(
        (a, b) =>
          new Date(a.due_date ?? "").getTime() -
          new Date(b.due_date ?? "").getTime()
      );
    },
    [getLastDayOfBillingCycle, determineTransactionCycle]
  );

  return { generateTransactionsForYear };
}
