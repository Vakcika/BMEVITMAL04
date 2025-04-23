import { useAuth } from "@webbydevs/react-laravel-sanctum-auth";
import useHttpGet from "@/api/useHttpGet";
import { toast } from "sonner";
import { Transaction, Currency, TransactionType } from "@/types/Transaction";
import { UUID } from "crypto";

interface TransactionResponse {
  data: Transaction;
}

interface CustomersResponse {
  data: Customer[];
}

interface SubscriptionsResponse {
  data: Subscription[];
}

export function useTransactionData(isNew: boolean, id?: string) {
  const { user } = useAuth();

  const initialValues: Transaction = {
    id: "" as UUID,
    customer: { id: 0 } as Customer,
    currency: { id: 0 } as Currency,
    transaction_type: { id: 0 } as TransactionType,
    subscription: null,
    created_by: user as unknown as User,
    amount: 0,
    amount_in_base: 0,
    transaction_date: null,
    due_date: null,
    payment_date: null,
    note: null,
    created_at: "",
    updated_at: "",
  };

  const query = isNew
    ? {
        data: { data: initialValues } as TransactionResponse,
        isLoading: false,
        error: null,
      }
    : useHttpGet<TransactionResponse>(`/api/transactions/${id}`);

  if (query.error) {
    toast.error(query.error.message || "Failed to load transaction.");
    console.error(query.error);
  }

  const customersQuery = useHttpGet<CustomersResponse>("/api/customers");
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

  const subscriptionsQuery =
    useHttpGet<SubscriptionsResponse>("/api/subscriptions");
  if (subscriptionsQuery.error) {
    toast.error(
      subscriptionsQuery.error.message || "Failed to load subscriptions."
    );
    console.error(subscriptionsQuery.error);
  }

  return {
    initialValues: (!isNew && query.data?.data) || initialValues,
    isLoading: query.isLoading,
    customers: customersQuery.data?.data || [],
    currencies: currenciesQuery.data || [],
    transactionTypes: transactionTypesQuery.data || [],
    subscriptions: subscriptionsQuery.data?.data || [],
  };
}
