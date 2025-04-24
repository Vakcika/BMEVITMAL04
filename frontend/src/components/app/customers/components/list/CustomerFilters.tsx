import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useCustomerFormOptions from "../../hooks/useCustomerFormOption";

export default function CustomerFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { users, statuses, isLoading } = useCustomerFormOptions();

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
        value={searchParams.get("user") ?? "all"}
        onValueChange={(value) => updateParam("user", value)}
        disabled={isLoading.usersLoading}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Filter: user" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All user</SelectItem>
          {users.map((user) => (
            <SelectItem key={user.id} value={user.name}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get("status") ?? "all"}
        onValueChange={(value) => updateParam("status", value)}
        disabled={isLoading.statusesLoading}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Filter: status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All status</SelectItem>
          {statuses.map((status) => (
            <SelectItem key={status.id} value={status.name}>
              {status.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
