import { UUID } from "crypto";
import { useAuth } from "@webbydevs/react-laravel-sanctum-auth";
import useHttpPut from "@/api/useHttpPut";
import useHttpPost from "@/api/useHttpPost";
import { Transaction } from "@/types/Transaction";
import { toast } from "sonner";

interface TransactionApiData {
  id?: UUID;
  customer_id: number;
  currency: string;
  created_by_id: number;
  subscription_id: number | null;
  transaction_type_id: number;
  amount: number;
  amount_in_base: number;
  transaction_date: string;
  due_date: string | null;
  payment_date: string | null;
  note: string | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * Get exchange rate for the specified currency to HUF
 * If a date is provided, it fetches historical data for that date
 * Otherwise, it uses the latest exchange rate
 */
async function getExchangeRate(from: string, date: string): Promise<number> {
  if (from === "HUF") return 1;

  const response = await fetch(
    `https://api.frankfurter.app/${date}?from=${from}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch exchange rate for ${from}${date ? ` on ${date}` : ""}`
    );
  }

  const data = await response.json();

  if (!data.rates?.HUF) {
    throw new Error(
      `No HUF rate available for ${from}${date ? ` on ${date}` : ""}`
    );
  }
  toast.info(
    `The exhange rate for ${from} ${date ? ` on ${date}` : ""} was ${
      data.rates.HUF
    }`
  );
  return data.rates.HUF;
}

export function useTransactionMutations() {
  const { user } = useAuth();
  const updateMutation = useHttpPut("/api/transactions");
  const createMutation = useHttpPost("/api/transactions");

  const prepareTransactionData = async (
    values: Transaction
  ): Promise<TransactionApiData> => {
    const newValues: any = { ...values };

    const fromCurrencyCode = values.currency.code;

    // Convert to HUF using appropriate exchange rate
    if (fromCurrencyCode === "HUF") {
      newValues.amount_in_base = values.amount;
    } else {
      const rate = await getExchangeRate(
        fromCurrencyCode,
        values.transaction_date.split("T")[0]
      );
      newValues.amount_in_base = Math.round(values.amount * rate); // Round to 0 decimals
    }

    // Transform relationships to foreign keys
    newValues.customer_id = values.customer.id;
    newValues.currency = values.currency.code;
    newValues.created_by_id = user?.user?.id;
    newValues.subscription_id =
      values.subscription?.id === 0 ? null : values.subscription?.id;
    newValues.transaction_type_id = values.transaction_type.id;

    // Remove nested objects
    delete newValues.customer;
    delete newValues.created_by;
    delete newValues.subscription;
    delete newValues.transaction_type;

    return newValues as TransactionApiData;
  };

  const createTransaction = async (values: Transaction) => {
    const preparedData = await prepareTransactionData(values);
    return await createMutation.mutateAsync(preparedData);
  };

  const updateTransaction = async (values: Transaction) => {
    const preparedData = await prepareTransactionData(values);
    return await updateMutation.mutateAsync(preparedData);
  };

  return {
    createTransaction,
    updateTransaction,
  };
}
