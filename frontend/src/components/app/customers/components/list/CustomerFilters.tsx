import { useSearchParams } from "react-router-dom";
import useCustomerFormOptions from "../../hooks/useCustomerFormOption";
import FilterSelect from "@/components/app/common/FilterSelect";
export default function CustomerFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { users, statuses, isLoading } = useCustomerFormOptions();

  return (
    <>
      <FilterSelect
        label="user"
        paramKey="user"
        options={users.map((u) => ({ value: u.name, label: u.name }))}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        disabled={isLoading.usersLoading}
      />
      <FilterSelect
        label="status"
        paramKey="status"
        options={statuses.map((s) => ({ value: s.name, label: s.name }))}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        disabled={isLoading.statusesLoading}
      />
    </>
  );
}
