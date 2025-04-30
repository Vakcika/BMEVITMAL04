import useHttpGet from "@/api/useHttpGet";
import { toast } from "sonner";
import { Subscription, BillingCycle } from "@/types/Subscription";
import { Currency } from "@/types/Transaction";

interface SubscriptionResponse {
  data: Subscription;
}

interface UseSubscriptionDataParams {
  customerId?: string | null;
}

export function useSubscriptionData(
  isNew: boolean,
  id?: string,
  { customerId }: UseSubscriptionDataParams = {}
) {
  const initialValues: Subscription = {
    id: 0,
    name: "",
    customer: { id: customerId ? parseInt(customerId) : 0 } as Customer,
    billing_cycle: { id: 3 } as BillingCycle,
    currency: { id: 1 } as Currency,
    amount: 0,
    start_date: "",
    end_date: "",
    created_at: "",
    updated_at: "",
  };

  const query = isNew
    ? {
        data: { data: initialValues } as SubscriptionResponse,
        isLoading: false,
        error: null,
      }
    : useHttpGet<SubscriptionResponse>(`/api/subscriptions/${id}`);

  if (query.error) {
    toast.error(query.error.message || "Failed to load subscription.");
    console.error(query.error);
  }

  return {
    initialValues: (!isNew && query.data?.data) || initialValues,
    isLoading: query.isLoading,
  };
}
