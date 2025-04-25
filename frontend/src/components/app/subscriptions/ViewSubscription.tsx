import useHttpDelete from "@/api/useHttpDelete";
import useHttpGet from "@/api/useHttpGet";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import LoadingCircle from "@/components/common/LoadingCircle";
import { Subscription } from "@/types/Subscription";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import ViewSubscriptionHeader from "./components/view/ViewSubscriptionHeader";
import SubscriptionDetailsCard from "./components/view/SubscriptionDetailsCard";
import AdditionalInfoCard from "./components/view/AddtitionalInfoCard";
import CustomerInfoCard from "@/components/common/details/CustomerInfoCard";

export default function ViewSubscription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const query = useHttpGet<{ data: Subscription }>(`/api/subscriptions/${id}`);

  if (query.error) {
    toast.error(query.error.message || "Failed to load subscription.");
    console.error(query.error);
  }

  const deleteMutation = useHttpDelete("/api/subscriptions", query);

  useEffect(() => {
    if (query.data) {
      setSubscription(query.data.data);
    }
  }, [query.data]);

  const handleEdit = () => {
    navigate(`/app/subscription/${id}/edit`);
  };

  const handleDelete = async (subscription: Subscription) => {
    try {
      await deleteMutation.mutateAsync(subscription.id);
      toast.success("Subscription deleted successfully");
      navigate(`/app/subscriptions`);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to delete subscription"
      );
      console.error(error);
    }
  };

  const breadcrumbs = [
    { label: "Subscriptions", url: "/app/subscriptions" },
    { label: `#${id}`, url: "" },
  ];

  if (query.isLoading) return <LoadingCircle />;
  if (!subscription) return <div>Subscription not found</div>;

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <ViewSubscriptionHeader
        subscription={subscription}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <SubscriptionDetailsCard subscription={subscription} />
        <AdditionalInfoCard subscription={subscription} />
        <CustomerInfoCard customer={subscription.customer} />
      </div>
    </div>
  );
}
