import { useSearchParams } from "react-router-dom";
import FilterSelect from "@/components/tables/FilterSelect";
import useFormOptions from "@/components/app/hooks/useFormOptions.ts";

export default function SubscriptionFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { billingCycles, customers, isLoading } = useFormOptions();

  return (
    <>
      <FilterSelect
        label="customers"
        paramKey="customer"
        options={customers.map((c) => ({
          value: c.id.toString(),
          label: c.company_name,
        }))}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        disabled={isLoading.currencies}
      />
      <FilterSelect
        label="billing cycle"
        paramKey="billing_cycle"
        options={billingCycles.map((b) => ({ value: b.name, label: b.name }))}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        disabled={isLoading.billingCycles}
      />
    </>
  );
}
