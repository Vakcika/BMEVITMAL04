import { useSearchParams } from "react-router-dom";
import FilterSelect from "@/components/tables/FilterSelect";
import useFormOptions from "@/components/app/hooks/useFormOptions.ts";
export default function CustomerFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { users, statuses, isLoading } = useFormOptions();

  return (
    <>
      <FilterSelect
        label="user"
        paramKey="user"
        options={users.map((u) => ({ value: u.name, label: u.name }))}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        disabled={isLoading.users}
      />
      <FilterSelect
        label="status"
        paramKey="status"
        options={statuses.map((s) => ({ value: s.name, label: s.name }))}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        disabled={isLoading.statuses}
      />
    </>
  );
}
