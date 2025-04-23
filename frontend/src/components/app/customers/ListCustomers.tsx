import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import CustomerListWrapper from "./components/list/CustomerListWrapper";

export default function ListCustomers() {
  const breadcrumbs = [{ label: "Customers", url: "/app/customers" }];

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <CustomerListWrapper />
    </div>
  );
}
