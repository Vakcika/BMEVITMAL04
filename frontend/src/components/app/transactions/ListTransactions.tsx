import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useHttpGet from "@/api/useHttpGet";
import useHttpDelete from "@/api/useHttpDelete";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import { TransactionTable } from "@/components/tables/TransactionTable";
import { Transaction } from "@/types/Transaction";

export default function ListTransactions() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);

  const query = useHttpGet<PagableResourceWrapper<Transaction[]>>(
    `/api/transactions?per_page=${rows}&page=${page}&currency=EUR`
  );

  console.log(query);

  if (query.error) {
    toast.error(query.error.message || "Failed to load transactions.");
    console.error(query.error);
  }

  const deleteMutation = useHttpDelete("/api/transactions", query);

  const handleView = (transaction: Transaction) => {
    navigate(`/app/transactions/${transaction.id}`);
  };

  const handleCreate = () => {
    navigate("/app/transactions/new");
  };

  const handleDelete = async (transaction: Transaction) => {
    try {
      await deleteMutation.mutateAsync(transaction.id);
      toast.success("Transaction deleted successfully");
      await query.refetch();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to delete transaction"
      );
      console.error(error);
    }
  };

  const breadcrumbs = [{ label: "Transactions", url: "/app/transactions" }];

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <div className="flex justify-between items-center mt-6 mb-4">
        <h1 className="text-2xl font-semibold">Transactions</h1>
        <Button className="bg-p300 text-n0" onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Add new transaction
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <TransactionTable
          value={query.data?.data ?? []}
          loading={query.isLoading || query.isFetching}
          title="Transactions"
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
