import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import TransactionListWrapper from "./components/list/TransactionListWrapper";

export default function ListTransactions() {
  const breadcrumbs = [{ label: "Transactions", url: "/app/transactions" }];

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <TransactionListWrapper title="Transactions" />
    </div>
  );
}
