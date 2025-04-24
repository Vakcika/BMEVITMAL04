import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import SubscriptionListWrapper from "./components/list/SubscriptionListWrapper";

export default function ListSubscriptions() {
  const breadcrumbs = [{ label: "Customers", url: "/app/customers" }];

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <SubscriptionListWrapper />
    </div>
  );
}
