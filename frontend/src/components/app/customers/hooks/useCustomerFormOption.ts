import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";

export default function useCustomerFormOptions() {
  const statusesQuery = useHttpGet<CustomerStatus[]>("/api/customer-statuses");
  const usersQuery = useHttpGet<User[]>("/api/users");

  if (statusesQuery.error) {
    toast.error(statusesQuery.error.message || "Failed to load status.");
    console.error(statusesQuery.error);
  }

  if (usersQuery.error) {
    toast.error(usersQuery.error.message || "Failed to load users.");
    console.error(usersQuery.error);
  }

  return {
    statuses: statusesQuery.data || [],
    users: usersQuery.data || [],
    isLoading: {
      statusesLoading: statusesQuery.isLoading,
      usersLoading: usersQuery.isLoading,
    },
  };
}
