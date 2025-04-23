import { useAuth } from "@webbydevs/react-laravel-sanctum-auth";
import useHttpPut from "@/api/useHttpPut";
import useHttpPost from "@/api/useHttpPost";
import { Transaction } from "@/types/Transaction";
import { UUID } from "crypto";

interface TransactionApiData {
  id?: UUID;
  customer_id: number;
  currency_id: number;
  created_by_id: number;
  subscription_id: number | null;
  transaction_type_id: number;
  amount: number;
  amount_in_base: number;
  transaction_date: string | null;
  due_date: string | null;
  payment_date: string | null;
  note: string | null;
  created_at?: string;
  updated_at?: string;
}

export function useTransactionMutations() {
  const { user } = useAuth();
  const updateMutation = useHttpPut("/api/transactions");
  const createMutation = useHttpPost("/api/transactions");

  const prepareTransactionData = (values: Transaction): TransactionApiData => {
    const newValues: any = { ...values };

    newValues["customer_id"] = values.customer.id;
    newValues["currency_id"] = values.currency.id;
    newValues["created_by_id"] = user.user.id;
    newValues["subscription_id"] = values.subscription?.id;
    newValues["transaction_type_id"] = values.transaction_type.id;

    delete newValues["customer"];
    delete newValues["currency"];
    delete newValues["created_by"];
    delete newValues["subscription"];
    delete newValues["transaction_type"];

    return newValues as TransactionApiData;
  };

  const createTransaction = async (values: Transaction) => {
    return await createMutation.mutateAsync(prepareTransactionData(values));
  };

  const updateTransaction = async (values: Transaction) => {
    return await updateMutation.mutateAsync(prepareTransactionData(values));
  };

  return {
    createTransaction,
    updateTransaction,
  };
}
