import useHttpPut from "@/api/useHttpPut";
import useHttpPost from "@/api/useHttpPost";

interface CustomerApiData {
  id?: number;
  user_id: number;
  status_id: number;
  company_name: string;
  name: string;
  email: string;
  phone_number?: string;
  address?: string;
  tax_number?: string;
  website?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export function useCustomerMutations() {
  const updateMutation = useHttpPut("/api/customers");
  const createMutation = useHttpPost("/api/customers");

  const prepareCustomerData = (values: Customer): CustomerApiData => {
    const newValues: any = { ...values };

    newValues["user_id"] = values.user?.id;
    newValues["status_id"] = values.status.id;

    delete newValues["user"];
    delete newValues["status"];

    return newValues as CustomerApiData;
  };

  const createCustomer = async (values: Customer) => {
    return await createMutation.mutateAsync(prepareCustomerData(values));
  };

  const updateCustomer = async (values: Customer) => {
    return await updateMutation.mutateAsync(prepareCustomerData(values));
  };

  return {
    createCustomer,
    updateCustomer,
  };
}
