import { useAuth } from "@webbydevs/react-laravel-sanctum-auth";
import useHttpGet from "@/api/useHttpGet";
import { toast } from "sonner";
import { Transaction, Currency, TransactionType } from "@/types/Transaction";
import { UUID } from "crypto";

interface TransactionResponse {
  data: Transaction;
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

  return {
    initialValues: (!isNew && query.data?.data) || initialValues,
    isLoading: query.isLoading,
  };
}
