import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import useHttpGet from "@/api/useHttpGet";
import useHttpDelete from "@/api/useHttpDelete";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomerTable } from "./CustomerTable";

export default function CustomerListWrapper({
  title = "Customers",
  defaultRows = 25,
  baseUrl = "/api/customers",
  queryParams = "",
}: Readonly<WrapperProps>) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(defaultRows);

  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();
  const query = useHttpGet<PagableResourceWrapper<Customer[]>>(
    `${baseUrl}?per_page=${rows}&page=${page}${queryParams}&${queryString}`
  );
  if (query.error) {
    toast.error(query.error.message || "Failed to load customers.");
    console.error(query.error);
  }

  const deleteMutation = useHttpDelete(baseUrl, query);

  const handleView = (customer: Customer) => {
    navigate(`/app/customer/${customer.id}`);
  };

  const handleCreate = () => {
    navigate("/app/customer/new");
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

  return (
    <div>
      <div className="flex justify-between items-center mt-6 mb-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <Button className="bg-p300 text-n0" onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add new customer
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <CustomerTable
          value={query.data?.data ?? []}
          loading={query.isLoading || query.isFetching}
          title={title}
          onView={handleView}
          onDelete={handleDelete}
          paginationProps={{
            totalRecords: query.data?.meta.total ?? 0,
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
