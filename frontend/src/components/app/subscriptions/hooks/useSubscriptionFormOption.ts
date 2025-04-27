// useSubscriptionFormOptions.ts
import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";
import { BillingCycle } from "@/types/Subscription";
import { Currency } from "@/types/Transaction";

export default function useSubscriptionFormOptions() {
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

  const billingCyclesQuery = useHttpGet<BillingCycle[]>("/api/billing-cycles");
  if (billingCyclesQuery.error) {
    toast.error(
      billingCyclesQuery.error.message || "Failed to load billing cycles."
    );
    console.error(billingCyclesQuery.error);
  }

  return {
    customers: customersQuery.data?.data || [],
    currencies: currenciesQuery.data || [],
    billingCycles: billingCyclesQuery.data || [],
    isLoading: {
      customers: customersQuery.isLoading,
      currencies: currenciesQuery.isLoading,
      billingCycles: billingCyclesQuery.isLoading,
    },
  };
}
