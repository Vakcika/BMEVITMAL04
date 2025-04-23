import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useTransactionFormOptions from "../../hooks/useTransactionFormOptions";

export default function TransactionFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currencies, transactionTypes, isLoading } =
    useTransactionFormOptions();

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
        value={searchParams.get("currency") ?? "all"}
        onValueChange={(value) => updateParam("currency", value)}
        disabled={isLoading.currencies}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Filter: Currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All currencies</SelectItem>
          {currencies.map((currency) => (
            <SelectItem key={currency.id} value={currency.code}>
              {currency.code} ({currency.symbol})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get("type") ?? "all"}
        onValueChange={(value) => updateParam("type", value)}
        disabled={isLoading.transactionTypes}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Filter: Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All type</SelectItem>
          {transactionTypes.map((status) => (
            <SelectItem key={status.id} value={status.name}>
              {status.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
