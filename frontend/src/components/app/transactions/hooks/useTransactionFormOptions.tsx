import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";
import { Currency, TransactionType } from "@/types/Transaction";
import { Subscription } from "@/types/Subscription";

export default function useTransactionFormOptions() {
  const customersQuery = useHttpGet<{ data: Customer[] }>(
    "/api/customers?per_page=100"
  );
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
    "/api/subscriptions?per_page=100"
  );
  if (subscriptionsQuery.error) {
    toast.error(
      subscriptionsQuery.error.message || "Failed to load subscriptions."
    );
    console.error(subscriptionsQuery.error);
  }

  const transactionYearsQuery = useHttpGet<{ years: number[] }>(
    `/api/transactions-years`
  );
  if (transactionYearsQuery.error) {
    toast.error(
      transactionYearsQuery.error.message ||
        "Failed to load subscription years."
    );
    console.error(transactionYearsQuery.error);
  }

  return {
    customers: customersQuery.data?.data || [],
    currencies: currenciesQuery.data || [],
    transactionTypes: transactionTypesQuery.data || [],
    subscriptions: subscriptionsQuery.data?.data || [],
    years: transactionYearsQuery.data?.years || [],
    isLoading: {
      customers: customersQuery.isLoading,
      currencies: currenciesQuery.isLoading,
      transactionTypes: transactionTypesQuery.isLoading,
      subscriptions: subscriptionsQuery.isLoading,
      years: transactionYearsQuery.isLoading,
    },
  };
}
