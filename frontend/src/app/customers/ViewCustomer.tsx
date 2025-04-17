import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import useHttpGet from "@/api/useHttpGet";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import LoadingCircle from "@/components/common/LoadingCircle";
import { DeleteActionButton } from "@/components/tables/actions/DeleteActionButton";
import useHttpDelete from "@/api/useHttpDelete";
import EmailLink from "@/components/common/EmailLink";
import PhoneLink from "@/components/common/PhoneLink";

export default function ViewCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<Customer | null>(null);

  const query = useHttpGet<Customer>(`/api/customers/${id}`);
  const deleteMutation = useHttpDelete("/api/customers", query);

  useEffect(() => {
    if (query.data) {
      setCustomer(query.data);
    }
  }, [query.data]);

  if (query.error) {
    toast.error(query.error.name || "Failed to load customer.");
    console.error(query.error);
  }

  const handleEdit = () => {
    navigate(`/app/customers/${id}/edit`);
  };

  const handleDelete = async (customer: Customer) => {
    try {
      await deleteMutation.mutateAsync(customer.id);
      toast.success("Customer deleted successfully");
      navigate(`/app/customers`);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          error?.message ??
          "Failed to delete customer"
      );
      console.error(error);
    }
  };

  const breadcrumbs = [
    { label: "Customers", url: "/app/customers" },
    { label: query.data?.name, url: "" },
  ];

  if (query.isLoading) return <LoadingCircle />;
  if (!customer) return <div>Customer not found</div>;

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />

      <div className="mt-6 mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl font-semibold">{customer.name}</h1>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          {handleDelete && (
            <DeleteActionButton
              item={customer}
              itemName="customer"
              itemLabel={customer.name}
              onDelete={handleDelete}
              variant="lg"
            />
          )}
        </div>
      </div>

      <Card className="bg-white rounded-lg shadow">
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Detail label="ID" value={customer.id} />
            <Detail
              label="Email"
              value={<EmailLink email={customer.email} />}
            />
            <Detail
              label="Phone"
              value={<PhoneLink phone={customer.phone_number} />}
            />

            <Detail label="Name" value={customer.name} />
            <Detail
              label="Created At"
              value={new Date(customer.created_at).toLocaleString()}
            />
            <div className="sm:col-span-2 lg:col-span-3">
              <Detail label="Description" value={customer.description} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Detail({
  label,
  value,
}: Readonly<{
  label: string;
  value: string | React.ReactNode;
}>) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <span className="text-lg">{value}</span>
    </div>
  );
}
