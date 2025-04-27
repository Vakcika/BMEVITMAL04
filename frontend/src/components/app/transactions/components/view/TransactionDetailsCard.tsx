import {
  Building,
  Tag,
  Calendar,
  DollarSign,
  CreditCard,
  CalendarClock,
  Clock,
  CheckCircle,
  Repeat,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import DetailWithIcon from "@/components/common/details/DetailWithIcon";
import TransactionTypeBadge from "@/components/common/badges/TransactionTypeBadge";
import { Transaction } from "@/types/Transaction";

export default function TransactionDetailsCard({
  transaction,
}: Readonly<{
  transaction: Transaction;
}>) {
  return (
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
            value={<TransactionTypeBadge type={transaction.transaction_type} />}
          />
          <DetailWithIcon
            icon={<Calendar className="w-6 h-6 text-n100" />}
            label="Transaction Date"
            value={
              transaction.transaction_date
                ? new Date(transaction.transaction_date).toLocaleDateString()
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
              value={
                <a
                  href={"/app/subscription/" + transaction.subscription?.id}
                  className="text-p500 hover:underline"
                >
                  {transaction.subscription?.name ?? "N/A"}
                </a>
              }
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
