import useHttpDelete from "@/api/useHttpDelete";
import useHttpGet from "@/api/useHttpGet";
import PaymentStatusBadge from "@/components/common/badges/PaymentStatusBadge";
import TransactionTypeBadge from "@/components/common/badges/TransactionTypeBadge";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import Detail from "@/components/common/details/Detail";
import DetailWithIcon from "@/components/common/details/DetailWithIcon";
import EmailLink from "@/components/common/links/EmailLink";
import PhoneLink from "@/components/common/links/PhoneLink";
import LoadingCircle from "@/components/common/LoadingCircle";
import UserAvatar from "@/components/common/UserAvatar";
import { DeleteActionButton } from "@/components/tables/actions/DeleteActionButton";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Transaction } from "@/types/Transaction";
import {
  Edit,
  Building,
  Tag,
  Calendar,
  DollarSign,
  CreditCard,
  CalendarClock,
  Clock,
  CheckCircle,
  Repeat,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function ViewTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  const query = useHttpGet<{ data: Transaction }>(`/api/transactions/${id}`);
  if (query.error) {
    toast.error(query.error.name || "Failed to load transaction.");
    console.error(query.error);
  }

  const deleteMutation = useHttpDelete("/api/transactions", query);

  useEffect(() => {
    if (query.data) {
      setTransaction(query.data.data);
    }
  }, [query.data]);

  const handleEdit = () => {
    navigate(`/app/transactions/${id}/edit`);
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
      <div className="mt-6 mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold">
            Transaction: #{transaction.id.substring(0, 8)}
          </h1>
          <p className="text-n100">
            {transaction.customer?.company_name} •
            <PaymentStatusBadge transaction={transaction} />
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleEdit}>
            <Edit className="w-6 h-6 mr-2" />
            Edit
          </Button>
          {handleDelete && (
            <DeleteActionButton
              item={transaction}
              itemName="transaction"
              itemLabel={`Transaction #${transaction.id.substring(0, 8)}`}
              onDelete={handleDelete}
              variant="lg"
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="bg-n0 rounded-lg shadow lg:col-span-2">
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DetailWithIcon
                icon={<Building className="w-6 h-6 text-n100" />}
                label="Customer"
                value={transaction.customer?.company_name ?? "N/A"}
              />
              <DetailWithIcon
                icon={<Tag className="w-6 h-6 text-n100" />}
                label="Transaction Type"
                value={
                  <TransactionTypeBadge type={transaction.transaction_type} />
                }
              />
              <DetailWithIcon
                icon={<Calendar className="w-6 h-6 text-n100" />}
                label="Transaction Date"
                value={
                  transaction.transaction_date
                    ? new Date(
                        transaction.transaction_date
                      ).toLocaleDateString()
                    : "N/A"
                }
              />
              <DetailWithIcon
                icon={<DollarSign className="w-6 h-6 text-n100" />}
                label="Amount"
                value={`${
                  transaction.currency?.symbol ?? ""
                } ${transaction.amount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
              />
              <DetailWithIcon
                icon={<CreditCard className="w-6 h-6 text-n100" />}
                label="Currency"
                value={transaction.currency?.code ?? "N/A"}
              />
              <DetailWithIcon
                icon={<CalendarClock className="w-6 h-6 text-n100" />}
                label="Created At"
                value={new Date(transaction.created_at).toLocaleString()}
              />
              <DetailWithIcon
                icon={<Clock className="w-6 h-6 text-n100" />}
                label="Due Date"
                value={
                  transaction.due_date
                    ? new Date(transaction.due_date).toLocaleDateString()
                    : "N/A"
                }
              />
              <DetailWithIcon
                icon={<CheckCircle className="w-6 h-6 text-n100" />}
                label="Payment Date"
                value={
                  transaction.payment_date
                    ? new Date(transaction.payment_date).toLocaleDateString()
                    : "Not paid yet"
                }
              />
              {transaction.subscription && (
                <DetailWithIcon
                  icon={<Repeat className="w-6 h-6 text-n100" />}
                  label="Subscription"
                  value={transaction.subscription?.name ?? "N/A"}
                />
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-n0 rounded-lg shadow lg:col-span-2 xl:col-span-1">
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Detail
                label="Created By"
                value={<UserAvatar user={transaction.created_by.name} />}
              />
              <Detail
                label="Notes"
                value={transaction.note ?? "No notes provided."}
              />
              <Detail
                label="Amount in Base Currency"
                value={transaction.amount_in_base}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-n0 rounded-lg shadow lg:col-span-2 xl:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Customer Information</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                navigate(`/app/customers/${transaction.customer.id}`)
              }
            >
              <Building className="w-4 h-4 mr-2" />
              View Customer
            </Button>
          </CardHeader>
          <CardContent>
            {transaction.customer ? (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <DetailWithIcon
                  icon={<User className="w-6 h-6 text-n100" />}
                  label="Contact"
                  value={transaction.customer.name}
                />
                <DetailWithIcon
                  icon={<Mail className="w-6 h-6 text-n100" />}
                  label="Email"
                  value={<EmailLink email={transaction.customer.email} />}
                />
                <DetailWithIcon
                  icon={<Phone className="w-6 h-6 text-n100" />}
                  label="Phone"
                  value={
                    <PhoneLink phone={transaction.customer.phone_number} />
                  }
                />
              </div>
            ) : (
              <p>No customer information available.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
