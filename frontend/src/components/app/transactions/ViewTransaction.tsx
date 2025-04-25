import useHttpDelete from "@/api/useHttpDelete";
import useHttpGet from "@/api/useHttpGet";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import LoadingCircle from "@/components/common/LoadingCircle";
import { Transaction } from "@/types/Transaction";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import ViewTransactionHeader from "./components/view/ViewTransactionHeader";
import AdditionalInfoCard from "./components/view/AdditionalInfoCard";
import CustomerInfoCard from "../../common/details/CustomerInfoCard";
import TransactionDetailsCard from "./components/view/TransactionDetailsCard";

export default function ViewTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const query = useHttpGet<{ data: Transaction }>(`/api/transactions/${id}`);
  if (query.error) {
    toast.error(query.error.message || "Failed to load transaction.");
    console.error(query.error);
  }

  const deleteMutation = useHttpDelete("/api/transactions", query);

  useEffect(() => {
    if (query.data) {
      setTransaction(query.data.data);
    }
  }, [query.data]);

  const handleEdit = () => {
    navigate(`/app/transaction/${id}/edit`);
  };

  const handleDelete = async (transaction: Transaction) => {
    try {
      await deleteMutation.mutateAsync(transaction.id);
      toast.success("Transaction deleted successfully");
      navigate(`/app/transactions`);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to delete transaction"
      );
      console.error(error);
    }
  };

  const breadcrumbs = [
    { label: "Transactions", url: "/app/transactions" },
    { label: `#${id?.substring(0, 8)}`, url: "" },
  ];

  if (query.isLoading) return <LoadingCircle />;
  if (!transaction) return <div>Transaction not found</div>;

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <ViewTransactionHeader
        transaction={transaction}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <TransactionDetailsCard transaction={transaction} />
        <AdditionalInfoCard transaction={transaction} />
        <CustomerInfoCard customer={transaction.customer} />
      </div>
    </div>
  );
}
