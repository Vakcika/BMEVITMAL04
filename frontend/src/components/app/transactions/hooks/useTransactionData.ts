import { useAuth } from "@webbydevs/react-laravel-sanctum-auth";
import useHttpGet from "@/api/useHttpGet";
import { toast } from "sonner";
import { Transaction, Currency, TransactionType } from "@/types/Transaction";
import { format } from "date-fns";
import { UUID } from "crypto";
import { Subscription } from "@/types/Subscription";

interface TransactionResponse {
  data: Transaction;
}
interface UseTransactionDataParams {
  customerId?: string | null;
  currency?: string | null;
  transactionTypeId?: string | null;
  subscriptionId?: string | null;
  amount?: string | null;
}
export function useTransactionData(
  isNew: boolean,
  id?: string,
  {
    customerId,
    currency,
    transactionTypeId,
    subscriptionId,
    amount = "0",
  }: UseTransactionDataParams = {}
) {
  const { user } = useAuth();
  const time = new Date();
  const initialValues: Transaction = {
    id: "" as UUID,
    customer: { id: customerId ? parseInt(customerId) : 0 } as Customer,
    currency: { code: currency ?? "HUF" } as Currency,
    transaction_type: {
      id: transactionTypeId ? parseInt(transactionTypeId) : 1,
    } as TransactionType,
    subscription: {
      id: subscriptionId ? parseInt(subscriptionId) : null,
    } as Subscription,
    created_by: user,
    amount: Number(amount),
    amount_in_base: 0,
    transaction_date: format(time, "yyyy-MM-dd'T'HH:mm"),
    due_date: null,
    payment_date: format(time, "yyyy-MM-dd"),
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
