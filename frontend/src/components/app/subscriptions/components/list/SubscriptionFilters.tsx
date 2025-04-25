import { useSearchParams } from "react-router-dom";
import useSubscriptionFormOptions from "../../hooks/useSubscriptionFormOption";
import FilterSelect from "@/components/app/common/FilterSelect";

export default function SubscriptionFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { billingCycles, customers, isLoading } = useSubscriptionFormOptions();

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
