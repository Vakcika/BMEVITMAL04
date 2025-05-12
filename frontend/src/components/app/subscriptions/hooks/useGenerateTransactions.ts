import { useCallback } from "react";
import { Transaction } from "@/types/Transaction";
import { Subscription } from "@/types/Subscription";
import { UUID } from "crypto";
import { endOfMonth, endOfQuarter, getMonth } from "date-fns";

export function useGenerateTransactions() {
  /**
   * Calculates the last day of a billing cycle based on the subscription's start date and cycle type
   * @param startDate - Subscription start date
   * @param cycleIndex - Which cycle number we're calculating (0-based)
   * @param cycleName - Billing cycle type (monthly/quarterly/yearly)
   * @returns Date object representing the last day of the billing cycle
   */
  const getLastDayOfBillingCycle = useCallback(
    (startDate: Date, cycleIndex: number, cycleName: string): Date => {
      const date = new Date(startDate);

      switch (cycleName.toLowerCase()) {
        case "monthly":
          // Monthly: Add cycleIndex months and get end of that month
          return endOfMonth(
            new Date(date.getFullYear(), date.getMonth() + cycleIndex)
          );

        case "quarterly": {
          // Quarterly: Calculate target quarter and get end of that quarter
          const quarterStartMonth = Math.floor(date.getMonth() / 3) * 3;
          const targetMonth = quarterStartMonth + cycleIndex * 3;
          return endOfQuarter(new Date(date.getFullYear(), targetMonth));
        }

        case "yearly": {
          // Yearly: Add cycleIndex years and set to January 31st
          const yearlyDate = new Date(date);
          yearlyDate.setFullYear(yearlyDate.getFullYear() + cycleIndex);
          yearlyDate.setMonth(0); // January
          return new Date(yearlyDate.getFullYear(), 0, 31);
        }

        default:
          return endOfMonth(date);
      }
    },
    []
  );

  /**
   * Determines which quarter (1-4) a date belongs to
   */
  const getQuarterFromDate = useCallback((date: Date): number => {
    return Math.floor(getMonth(date) / 3) + 1;
  }, []);

  /**
   * Maps a transaction to its corresponding billing cycle index
   */
  const determineTransactionCycle = useCallback(
    (
      tx: Transaction,
      billingCycle: string,
      selectedYear: number
    ): number | null => {
      // Use payment date if transaction date isn't available
      const dateToUse = tx.transaction_date
        ? new Date(tx.transaction_date)
        : tx.payment_date
        ? new Date(tx.payment_date)
        : null;

      if (!dateToUse || dateToUse.getFullYear() !== selectedYear) return null;

      switch (billingCycle.toLowerCase()) {
        case "monthly":
          return getMonth(dateToUse); // 0-11
        case "quarterly":
          return getQuarterFromDate(dateToUse) - 1; // Convert to 0-3
        case "yearly":
          return 0; // Only one cycle per year
        default:
          return null;
      }
    },
    [getQuarterFromDate]
  );

  /**
   * Generates transactions for a subscription, combining existing transactions with predicted ones
   * @param subscription - The subscription to generate transactions for
   * @param user - The user creating the transactions
   * @param existingTransactions - Already existing transactions from the API
   * @param selectedYear - The year to generate transactions for
   * @returns Combined array of real and predicted transactions
   */
  const generateTransactions = useCallback(
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
      const cycleName = subscription.billing_cycle.name.toLowerCase();

      // Adjust start date for the selected year
      const effectiveStartDate = new Date(startDate);
      if (startDate.getFullYear() < selectedYear) {
        // If subscription started before selected year, use Jan 1st of selected year
        effectiveStartDate.setFullYear(selectedYear, 0, 1);
      } else {
        // Otherwise use the actual start date within the year
        effectiveStartDate.setFullYear(selectedYear);
      }

      // Calculate number of billing cycles in the selected year
      let cycleCount = 0;
      if (cycleName === "monthly") {
        const endMonth =
          endDate?.getFullYear() === selectedYear ? endDate.getMonth() : 11;
        const startMonth = effectiveStartDate.getMonth();
        cycleCount = Math.max(0, endMonth - startMonth + 1);
      } else if (cycleName === "quarterly") {
        const startQuarter = Math.floor(effectiveStartDate.getMonth() / 3);
        const endQuarter =
          endDate?.getFullYear() === selectedYear
            ? Math.floor(endDate.getMonth() / 3)
            : 3;
        cycleCount = Math.max(0, endQuarter - startQuarter + 1);
      } else if (cycleName === "yearly") {
        const isActive =
          !(endDate && endDate.getFullYear() < selectedYear) &&
          startDate.getFullYear() <= selectedYear;
        cycleCount = isActive ? 1 : 0;
      }

      // Filter transactions for the selected year
      const yearTransactions = existingTransactions.filter((tx) => {
        const txDate = tx.transaction_date ?? tx.payment_date;
        return txDate && new Date(txDate).getFullYear() === selectedYear;
      });

      // Map existing transactions to their cycle indices
      const existingCycles = new Map<number, Transaction>();
      yearTransactions.forEach((tx) => {
        const cycle = determineTransactionCycle(tx, cycleName, selectedYear);
        if (cycle !== null) existingCycles.set(cycle, tx);
      });

      // Generate transactions for each cycle
      for (let cycleIndex = 0; cycleIndex < cycleCount; cycleIndex++) {
        const dueDate = getLastDayOfBillingCycle(
          effectiveStartDate,
          cycleIndex,
          cycleName
        );

        // Skip cycles beyond subscription end date (unless they have existing transactions)
        if (endDate && dueDate > endDate && !existingCycles.has(cycleIndex))
          continue;

        const existingTx = existingCycles.get(cycleIndex);

        if (existingTx) {
          // Use existing transaction but ensure it has a due date
          const txCopy = { ...existingTx };
          txCopy.due_date ??= dueDate.toISOString();
          transactions.push(txCopy);
        } else {
          // Create new mock transaction with detailed information
          transactions.push({
            id: `mock-tx-${subscription.id}-${cycleIndex}` as UUID,
            customer: subscription.customer,
            currency: subscription.currency,
            transaction_type: { id: 1, name: "Income" },
            subscription,
            created_by: user,
            amount: subscription.amount,
            amount_in_base: subscription.amount,
            transaction_date: "",
            due_date: dueDate.toISOString(),
            payment_date: null,
            note: `${subscription.name} payment (${
              cycleIndex + 1
            }/${cycleCount})`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
        }
      }

      // Add any unassigned transactions (fallback)
      yearTransactions.forEach((tx) => {
        if (determineTransactionCycle(tx, cycleName, selectedYear) === null) {
          transactions.push(tx);
        }
      });

      // Sort transactions by due date
      return transactions.sort(
        (a, b) =>
          new Date(a.due_date ?? "").getTime() -
          new Date(b.due_date ?? "").getTime()
      );
    },
    [getLastDayOfBillingCycle, determineTransactionCycle]
  );

  return { generateTransactions };
}
