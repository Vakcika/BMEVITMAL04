import { useCallback } from "react";
import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";
import { BillingCycle, Subscription } from "@/types/Subscription";
import { Currency, TransactionType } from "@/types/Transaction";
import { LogType } from "@/types/Logs";

export default function useFormOptions() {
  const statusesQuery = useHttpGet<CustomerStatus[]>("/api/customer-statuses");
  const usersQuery = useHttpGet<User[]>("/api/users");

  const customersQuery = useHttpGet<{ data: Customer[] }>(
    "/api/customers?per_page=100"
  );
  const currenciesQuery = useHttpGet<Currency[]>("/api/currencies");
  const billingCyclesQuery = useHttpGet<BillingCycle[]>("/api/billing-cycles");

  const transactionTypesQuery = useHttpGet<TransactionType[]>(
    "/api/transaction-types"
  );
  const subscriptionsQuery = useHttpGet<{ data: Subscription[] }>(
    "/api/subscriptions?per_page=100"
  );
  const transactionYearsQuery = useHttpGet<{ years: number[] }>(
    "/api/transactions-years"
  );
  const logTypesQuery = useHttpGet<LogType[]>("/api/log-statuses");

  const handleError = useCallback((error: any, defaultMessage: string) => {
    if (error) {
      toast.error(
        error?.response?.data?.message ?? error?.message ?? defaultMessage
      );
      console.error(error);
    }
  }, []);

  handleError(statusesQuery.error, "Failed to load status.");
  handleError(usersQuery.error, "Failed to load users.");
  handleError(customersQuery.error, "Failed to load customers.");
  handleError(currenciesQuery.error, "Failed to load currencies.");
  handleError(billingCyclesQuery.error, "Failed to load billing cycles.");
  handleError(transactionTypesQuery.error, "Failed to load transaction types.");
  handleError(subscriptionsQuery.error, "Failed to load subscriptions.");
  handleError(transactionYearsQuery.error, "Failed to load transaction years.");
  handleError(logTypesQuery.error, "Failed to load log types.");

  return {
    statuses: statusesQuery.data || [],
    users: usersQuery.data || [],
    customers: customersQuery.data?.data || [],
    currencies: currenciesQuery.data || [],
    logTypes: logTypesQuery.data || [],
    billingCycles: billingCyclesQuery.data || [],
    transactionTypes: transactionTypesQuery.data || [],
    subscriptions: subscriptionsQuery.data?.data || [],
    years: transactionYearsQuery.data?.years || [],

    isLoading: {
      statuses: statusesQuery.isLoading,
      users: usersQuery.isLoading,
      customers: customersQuery.isLoading,
      logTypes: logTypesQuery.isLoading,
      currencies: currenciesQuery.isLoading,
      billingCycles: billingCyclesQuery.isLoading,
      transactionTypes: transactionTypesQuery.isLoading,
      subscriptions: subscriptionsQuery.isLoading,
      years: transactionYearsQuery.isLoading,
    },
  };
}
