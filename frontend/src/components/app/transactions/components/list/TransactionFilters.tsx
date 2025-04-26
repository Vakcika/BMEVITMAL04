import { useSearchParams } from "react-router-dom";
import useTransactionFormOptions from "../../hooks/useTransactionFormOptions";
import FilterSelect from "@/components/tables/FilterSelect";

export default function TransactionFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currencies, transactionTypes, years, isLoading } =
    useTransactionFormOptions();

  return (
    <>
      <FilterSelect
        label="currency"
        paramKey="currency"
        options={currencies.map((c) => ({
          value: c.code,
          label: `${c.code} (${c.symbol})`,
        }))}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        disabled={isLoading.currencies}
      />
      <FilterSelect
        label="type"
        paramKey="type"
        options={transactionTypes.map((t) => ({
          value: t.name,
          label: t.name,
        }))}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        disabled={isLoading.transactionTypes}
      />
      <FilterSelect
        label="year"
        paramKey="year"
        options={years.map((t) => ({
          value: t.toString(),
          label: t.toString(),
        }))}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        disabled={isLoading.years}
      />
    </>
  );
}
