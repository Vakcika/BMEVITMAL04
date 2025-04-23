import { useParams } from "react-router-dom";
import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";
import { useAuth } from "@webbydevs/react-laravel-sanctum-auth";

export default function useCustomerData(isNew: boolean) {
  const { user } = useAuth();
  const { id } = useParams();

  const initialValues: Customer = {
    id: 0,
    user: user,
    status: { id: 1, name: "" },
    company_name: "",
    name: "",
    email: "",
    phone_number: "",
    address: "",
    tax_number: "",
    website: "",
    description: "",
    created_at: "",
    updated_at: "",
  };

  const query = isNew
    ? {
        data: { data: initialValues },
        isLoading: false,
        error: null,
      }
    : useHttpGet<{ data: Customer }>(`/api/customers/${id}`);

  if (query.error) {
    toast.error(query.error.message || "Failed to load customer.");
    console.error(query.error);
  }

  return {
    id,
    customerData: (!isNew && query.data?.data) || initialValues,
    isLoading: query.isLoading,
  };
}
