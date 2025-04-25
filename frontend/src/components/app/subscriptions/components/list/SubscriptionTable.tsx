import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeleteActionButton } from "../../../../tables/actions/DeleteActionButton";
import { ViewActionButton } from "../../../../tables/actions/ViewActionButton";
import {
  CustomPaginationProps,
  PaginationControls,
} from "../../../../tables/PaginationControls";
import { TableSkeleton } from "../../../../tables/TableSkeleton";
import { Subscription } from "@/types/Subscription";
import SubscriptionFilters from "./SubscriptionFilters";
import BillingCycleBadge from "@/components/common/badges/BillingCycleBadge";

interface TableProps {
  value: Subscription[];
  loading: boolean;
  title: string;
  onView: (data: Subscription) => void;
  onDelete?: (data: Subscription) => void;
  paginationProps?: CustomPaginationProps;
}

const pageSizeOptions = [
  { value: 5, label: "5 per page" },
  { value: 10, label: "10 per page" },
  { value: 25, label: "25 per page" },
  { value: 50, label: "50 per page" },
];

export const SubscriptionTable = ({
  value,
  loading,
  title,
  onView,
  onDelete,
  paginationProps,
}: TableProps) => {
  if (loading) {
    return (
      <TableSkeleton
        rowCount={paginationProps?.rows ?? 5}
        columnCount={7}
        actionCount={onDelete ? 2 : 1}
      />
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-end gap-4">
          <SubscriptionFilters />
          {paginationProps && (
            <Select
              value={paginationProps.rows.toString()}
              onValueChange={(value) => paginationProps.setRows(Number(value))}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col min-h-84">
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Billing Cycle</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {value?.map((subscription) => (
                <TableRow key={subscription.id}>
                  <TableCell>
                    {subscription.id.toString().substring(0, 8)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {subscription.customer?.company_name}
                  </TableCell>
                  <TableCell>{subscription.name}</TableCell>
                  <TableCell>
                    {subscription.currency?.symbol}
                    {subscription.amount}
                  </TableCell>
                  <TableCell>
                    <BillingCycleBadge cycle={subscription.billing_cycle} />
                  </TableCell>
                  <TableCell>
                    {subscription.start_date
                      ? new Date(subscription.start_date).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {subscription.end_date
                      ? new Date(subscription.end_date).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <ViewActionButton item={subscription} onClick={onView} />
                      {onDelete && (
                        <DeleteActionButton
                          item={subscription}
                          itemName="subscription"
                          itemLabel={`Subscription #${subscription.id
                            .toString()
                            .substring(0, 8)}`}
                          onDelete={onDelete}
                        />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {paginationProps && (
          <PaginationControls
            totalRecords={paginationProps?.totalRecords}
            rows={paginationProps?.rows}
            page={paginationProps?.page}
            setRows={paginationProps?.setRows}
            setPage={paginationProps?.setPage}
          />
        )}
      </CardContent>
    </Card>
  );
};
