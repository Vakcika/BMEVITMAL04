import useHttpPut from "@/api/useHttpPut";
import useHttpPost from "@/api/useHttpPost";
import { Subscription } from "@/types/Subscription";

interface SubscriptionApiData {
  id?: 0;
  name: string;
  customer_id: number;
  billing_cycle_id: number;
  currency_id: number;
  amount: number;
  start_date: string | null;
  end_date: string | null;
}

export function useSubscriptionMutations() {
  const updateMutation = useHttpPut("/api/subscriptions");
  const createMutation = useHttpPost("/api/subscriptions");

  const prepareSubscriptionData = (
    values: Subscription
  ): SubscriptionApiData => {
    const newValues: any = { ...values };

    newValues["customer_id"] = values.customer.id;
    newValues["billing_cycle_id"] = values.billing_cycle.id;
    newValues["currency_id"] = values.currency.id;

    delete newValues["customer"];
    delete newValues["billing_cycle"];
    delete newValues["currency"];

    return newValues as SubscriptionApiData;
  };

  const createSubscription = async (values: Subscription) => {
    return await createMutation.mutateAsync(prepareSubscriptionData(values));
  };

  const updateSubscription = async (values: Subscription) => {
    return await updateMutation.mutateAsync(prepareSubscriptionData(values));
  };

  return {
    createSubscription,
    updateSubscription,
  };
}
