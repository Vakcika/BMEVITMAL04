import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";
import BillingCycleBadge from "@/components/common/badges/BillingCycleBadge";
import { Subscription } from "@/types/Subscription";
import { Transaction } from "@/types/Transaction";
import { useAuth } from "@webbydevs/react-laravel-sanctum-auth";
import useHttpGet from "@/api/useHttpGet";
import { toast } from "sonner";
import TransactionList from "./TransactionList";
import { useGenerateTransactions } from "../../../hooks/useGenerateTransactions";
interface SubscriptionTransactionsCardProps {
  subscription: Subscription;
  year?: number;
}

export default function SubscriptionTransactionsCard({
  subscription,
  year = new Date().getFullYear(),
}: Readonly<SubscriptionTransactionsCardProps>) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { generateTransactions } = useGenerateTransactions();

  // Fetch actual transactions for this subscription
  const { data, error, isLoading } = useHttpGet<{ data: Transaction[] }>(
    `/api/transactions?per_page=100&subscription=${subscription.id}`
  );

  useEffect(() => {
    if (error) {
      toast.error(error.message ?? "Failed to load transactions.");
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (!user || isLoading) return;

    const timer = setTimeout(() => {
      const actualTransactions = data?.data ?? [];
      const allTransactions = generateTransactions(
        subscription,
        user,
        actualTransactions,
        year
      );

      setTransactions(allTransactions);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [subscription, user, data, isLoading, year, generateTransactions]);

  const renderCardContent = () => {
    if (loading) {
      return (
        <div className="p-4 space-y-3">
          {Array(3)
            .fill(null)
            .map((_, idx) => (
              <div
                key={`skeleton-${subscription.id}-${idx}`}
                className="h-12 bg-muted/50 rounded animate-pulse"
              />
            ))}
        </div>
      );
    }

    if (transactions.length === 0) {
      return (
        <div className="p-4 text-center text-muted-foreground text-sm">
          No payments scheduled for {year}
        </div>
      );
    }

    return (
      <TransactionList
        transactions={transactions}
        subscription={subscription}
      />
    );
  };

  return (
    <Card className="w-full border shadow-sm flex flex-col h-96">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Payment Schedule {year}</span>
          </CardTitle>
          <BillingCycleBadge cycle={subscription.billing_cycle} />
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-auto">
        {renderCardContent()}
      </CardContent>

      <CardFooter className="p-3 border-t">
        <div className="w-full flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {transactions.filter((tx) => tx.payment_date).length} of{" "}
            {transactions.length} paid
          </span>
          <span>{year}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
