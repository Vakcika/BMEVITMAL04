import { useSearchParams } from "react-router-dom";
import useSubscriptionFormOptions from "../../hooks/useSubscriptionFormOption";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SubscriptionFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { billingCycles, customers, isLoading } = useSubscriptionFormOptions();

  const updateParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "all") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams, { replace: true });
  };
  return (
    <>
      <Select
        value={searchParams.get("customer_id") ?? "all"}
        onValueChange={(value) => updateParam("customer_id", value)}
        disabled={isLoading.currencies}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Filter: customers" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All customers</SelectItem>
          {customers.map((data) => (
            <SelectItem key={data.id} value={data.id.toString()}>
              {data.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={searchParams.get("billing_cycles") ?? "all"}
        onValueChange={(value) => updateParam("billing_cycles", value)}
        disabled={isLoading.billingCycles}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Filter: billing cycle" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All cycle</SelectItem>
          {billingCycles.map((data) => (
            <SelectItem key={data.id} value={data.name}>
              {data.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
