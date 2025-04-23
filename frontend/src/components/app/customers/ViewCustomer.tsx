import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useHttpGet from "@/api/useHttpGet";
import useHttpDelete from "@/api/useHttpDelete";
import LoadingCircle from "@/components/common/LoadingCircle";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import ViewCustomerHeader from "./components/view/ViewCustomerHeader";
import CustomerDetailsCard from "./components/view/CustomerDatilsCard";
import CustomerExtraInfoCard from "./components/view/CustomerExtraInfoCard";
import TransactionListWrapper from "../transactions/components/list/TransactionListWrapper";

export default function ViewCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<Customer | null>(null);

  const query = useHttpGet<{ data: Customer }>(`/api/customers/${id}`);
  const deleteMutation = useHttpDelete("/api/customers", query);

  useEffect(() => {
    if (query.data) {
      setCustomer(query.data.data);
    }
  }, [query.data]);

  if (query.error) {
    toast.error(query.error.message || "Failed to load customer.");
    console.error(query.error);
  }

  const handleEdit = () => navigate(`/app/customers/${id}/edit`);

  const handleDelete = async (customer: Customer) => {
    try {
      await deleteMutation.mutateAsync(customer.id);
      toast.success("Customer deleted successfully");
      navigate(`/app/customers`);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to delete customer"
      );
      console.error(error);
    }
  };

  const breadcrumbs = [
    { label: "Customers", url: "/app/customers" },
    { label: customer?.company_name ?? "Customer", url: "" },
  ];

  if (query.isLoading) return <LoadingCircle />;
  if (!customer) return <div>Customer not found</div>;

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <ViewCustomerHeader
        customer={customer}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        <CustomerDetailsCard customer={customer} />
        <CustomerExtraInfoCard customer={customer} />
      </div>
      <TransactionListWrapper
        title="Transactions"
        queryParams={"&customer=" + customer.id}
      />
    </div>
  );
}
