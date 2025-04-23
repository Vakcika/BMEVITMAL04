import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";
import { Currency, TransactionType } from "@/types/Transaction";

export default function useTransactionFormOptions() {
  const customersQuery = useHttpGet<{ data: Customer[] }>("/api/customers");
  if (customersQuery.error) {
    toast.error(customersQuery.error.message || "Failed to load customers.");
    console.error(customersQuery.error);
  }

  const currenciesQuery = useHttpGet<Currency[]>("/api/currencies");
  if (currenciesQuery.error) {
    toast.error(currenciesQuery.error.message || "Failed to load currencies.");
    console.error(currenciesQuery.error);
  }

  const transactionTypesQuery = useHttpGet<TransactionType[]>(
    "/api/transaction-types"
  );
  if (transactionTypesQuery.error) {
    toast.error(
      transactionTypesQuery.error.message || "Failed to load transaction types."
    );
    console.error(transactionTypesQuery.error);
  }

  const subscriptionsQuery = useHttpGet<{ data: Subscription[] }>(
    "/api/subscriptions"
  );
  if (subscriptionsQuery.error) {
    toast.error(
      subscriptionsQuery.error.message || "Failed to load subscriptions."
    );
    console.error(subscriptionsQuery.error);
  }

  return {
    customers: customersQuery.data?.data || [],
    currencies: currenciesQuery.data || [],
    transactionTypes: transactionTypesQuery.data || [],
    subscriptions: subscriptionsQuery.data?.data || [],
    isLoading: {
      customers: customersQuery.isLoading,
      currencies: currenciesQuery.isLoading,
      transactionTypes: transactionTypesQuery.isLoading,
      subscriptions: subscriptionsQuery.isLoading,
    },
  };
}
