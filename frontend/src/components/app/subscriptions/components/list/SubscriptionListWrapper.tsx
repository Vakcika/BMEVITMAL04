import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import useHttpGet from "@/api/useHttpGet";
import useHttpDelete from "@/api/useHttpDelete";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Subscription } from "@/types/Subscription";
import { SubscriptionTable } from "./SubscriptionTable";

export default function SubscriptionListWrapper({
  title = "Subscriptions",
  baseUrl = "/api/subscriptions",
  defaultRows = 25,
  queryParams = "",
  createQueryParams = "",
}: Readonly<WrapperProps>) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(defaultRows);

  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();
  const query = useHttpGet<PagableResourceWrapper<Subscription[]>>(
    `${baseUrl}?per_page=${rows}&page=${page}${queryParams}&${queryString}`
  );

  if (query.error) {
    toast.error(query.error.message || "Failed to load subscriptions.");
    console.error(query.error);
  }

  const deleteMutation = useHttpDelete(baseUrl, query);

  const handleView = (subscription: Subscription) => {
    navigate(`/app/subscription/${subscription.id}`);
  };

  const handleCreate = () => {
    navigate(`/app/subscription/new?${createQueryParams}`);
  };

  const handleDelete = async (subscription: Subscription) => {
    try {
      await deleteMutation.mutateAsync(subscription.id);
      toast.success("Subscription deleted successfully");
      await query.refetch();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to delete subscription"
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
          Add new subscriber
        </Button>
      </div>
      <div>
        <SubscriptionTable
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
