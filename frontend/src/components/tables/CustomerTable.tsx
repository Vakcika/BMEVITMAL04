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
import { DeleteActionButton } from "./actions/DeleteActionButton";
import { ViewActionButton } from "./actions/ViewActionButton";
import {
  CustomPaginationProps,
  PaginationControls,
} from "./PaginationControls";
import PhoneLink from "../common/links/PhoneLink";
import EmailLink from "../common/links/EmailLink";
import { TableSkeleton } from "./TableSkeleton";
import CustomerStatusBadge from "../common/badges/CustomerStatusBadge";
import UserAvatar from "../common/UserAvatar";

interface TableProps {
  value: Customer[];
  loading: boolean;
  title: string;
  onView: (data: Customer) => void;
  onDelete?: (data: Customer) => void;
  paginationProps?: CustomPaginationProps;
}

const pageSizeOptions = [
  { value: 5, label: "5 per page" },
  { value: 10, label: "10 per page" },
  { value: 25, label: "25 per page" },
  { value: 50, label: "50 per page" },
];

export const CustomerTable = ({
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
        columnCount={8}
        actionCount={onDelete ? 2 : 1}
      />
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
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
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Contact Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Asignee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {value?.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell className="font-medium">
                  {customer.company_name}
                </TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>
                  <EmailLink email={customer.email} />
                </TableCell>
                <TableCell>
                  <PhoneLink phone={customer.phone_number} />
                </TableCell>
                <TableCell>
                  <UserAvatar user={customer.user?.name} />
                </TableCell>
                <TableCell>
                  <CustomerStatusBadge status={customer.status} />
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <ViewActionButton item={customer} onClick={onView} />
                    {onDelete && (
                      <DeleteActionButton
                        item={customer}
                        itemName="customer"
                        itemLabel={customer.company_name}
                        onDelete={onDelete}
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
