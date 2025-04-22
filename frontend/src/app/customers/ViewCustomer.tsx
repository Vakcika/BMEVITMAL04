import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Globe,
  Building,
  Phone,
  Mail,
  User,
  CalendarClock,
  Hash,
  UserCheck,
} from "lucide-react";
import useHttpGet from "@/api/useHttpGet";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import LoadingCircle from "@/components/common/LoadingCircle";
import { DeleteActionButton } from "@/components/tables/actions/DeleteActionButton";
import useHttpDelete from "@/api/useHttpDelete";
import EmailLink from "@/components/common/links/EmailLink";
import PhoneLink from "@/components/common/links/PhoneLink";
import WebsiteLink from "@/components/common/links/WebsiteLink";
import Detail from "@/components/common/details/Detail";
import DetailWithIcon from "@/components/common/details/DetailWithIcon";
import CustomerStatusBadge from "@/app/customers/CustomerStatusBadge";

export default function ViewCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);

  const query = useHttpGet<{ data: Customer }>(`/api/customers/${id}`);

  const deleteMutation = useHttpDelete("/api/customers", query);

  useEffect(() => {
    if (query.data) {
      setCustomer(query.data.data);
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
    { label: customer?.company_name ?? query.data?.data.company_name, url: "" },
  ];

  if (query.isLoading) return <LoadingCircle />;
  if (!customer) return <div>Customer not found</div>;

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <div className="mt-6 mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{customer.company_name}</h1>
          <p className="text-n100">
            {customer.name} • <CustomerStatusBadge status={customer.status} />
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleEdit}>
            <Edit className="w-6 h-6 mr-2" />
            Edit
          </Button>
          {handleDelete && (
            <DeleteActionButton
              item={customer}
              itemName="customer"
              itemLabel={customer.company_name}
              onDelete={handleDelete}
              variant="lg"
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="bg-n0 rounded-lg shadow lg:col-span-2">
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailWithIcon
                icon={<Building className="w-6 h-6 text-n100" />}
                label="Company"
                value={customer.company_name}
              />
              <DetailWithIcon
                icon={<UserCheck className="w-6 h-6 text-n100" />}
                label="Assigned to"
                value={customer.user?.name ?? "N/A"}
              />
              <DetailWithIcon
                icon={<User className="w-6 h-6 text-n100" />}
                label="Contact Name"
                value={customer.name}
              />
              <DetailWithIcon
                icon={<Mail className="w-6 h-6 text-n100" />}
                label="Email"
                value={<EmailLink email={customer.email} />}
              />
              <DetailWithIcon
                icon={<Phone className="w-6 h-6 text-n100" />}
                label="Phone"
                value={<PhoneLink phone={customer.phone_number} />}
              />
              <DetailWithIcon
                icon={<Globe className="w-6 h-6 text-n100" />}
                label="Website"
                value={
                  customer.website ? (
                    <WebsiteLink url={customer.website} />
                  ) : (
                    "N/A"
                  )
                }
              />
              <DetailWithIcon
                icon={<Hash className="w-6 h-6 text-n100" />}
                label="Tax Number"
                value={customer.tax_number ?? "N/A"}
              />
              <DetailWithIcon
                icon={<CalendarClock className="w-6 h-6 text-n100" />}
                label="Created At"
                value={new Date(customer.created_at).toLocaleString()}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-n0 rounded-lg shadow lg:col-span-2 xl:col-span-1">
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Detail label="Address" value={customer.address ?? "N/A"} />
              <Detail
                label="Description"
                value={customer.description || "No description provided."}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
