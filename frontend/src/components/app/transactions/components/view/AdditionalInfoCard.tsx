import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Detail from "@/components/common/details/Detail";
import UserAvatar from "@/components/common/UserAvatar";
import { Transaction } from "@/types/Transaction";
import useExchangeRate from "../../hooks/useExchangeRate";

export default function AdditionalInfoCard({
  transaction,
}: Readonly<{
  transaction: Transaction;
}>) {
  const { getExchangeRate } = useExchangeRate();
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const fetchedRate = await getExchangeRate(
          transaction.currency.code,
          transaction.transaction_date.split("T")[0]
        );
        setRate(fetchedRate);
      } catch (err) {
        console.error(err);
        toast.error("Failed to get exchange rate");
      }
    };

    fetchRate();
  }, [
    getExchangeRate,
    transaction.currency.code,
    transaction.transaction_date,
  ]);

  return (
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
            value={transaction.amount_in_base + " HUF"}
          />
          <Detail label="Rate" value={rate ? rate + " HUF" : "Loading..."} />
        </div>
      </CardContent>
    </Card>
  );
}
