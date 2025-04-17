import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useHttpGet from "@/api/useHttpGet";
import useHttpDelete from "@/api/useHttpDelete";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import { CustomerTable } from "@/components/tables/CustomerTable";

export default function ListCustomers() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(25);

  const query = useHttpGet<PagableResourceWrapper<Customer[]>>(
    `/api/customers?per_page=${rows}&page=${page}`
  );

  const deleteMutation = useHttpDelete("/api/customers", query);

  if (query.error) {
    toast.error(query.error.name || "Failed to load customers.");
    console.error(query.error);
  }

  const handleView = (customer: Customer) => {
    navigate(`/app/customers/${customer.id}`);
  };

  const handleCreate = () => {
    navigate("/app/customers/new");
  };

  const handleDelete = async (customer: Customer) => {
    try {
      await deleteMutation.mutateAsync(customer.id);
      toast.success("Customer deleted successfully");
      await query.refetch();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to delete customer"
      );
      console.error(error);
    }
  };

  const breadcrumbs = [{ label: "Customers", url: "/app/customers" }];

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <div className="flex justify-between items-center mt-6 mb-4">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <Button className="bg-p300 text-white" onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add new customer
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <CustomerTable
          value={query.data?.data ?? []}
          loading={query.isLoading || query.isFetching}
          title="Customers"
          onView={handleView}
          onDelete={handleDelete}
          paginationProps={{
            totalRecords: query.data?.total ?? 0,
            rows,
            page,
            setRows,
            setPage,
          }}
        />
      </div>
    </div>
  );
}
