import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import TransactionListWrapper from "../transactions/components/list/TransactionListWrapper";

export default function Dashboard() {
  const breadcrumbs = [{ label: "Customers", url: "/app/customers" }];

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <TransactionListWrapper queryParams={"&type=expense"} />
      <TransactionListWrapper queryParams={"&type=income"} />
    </div>
  );
}
