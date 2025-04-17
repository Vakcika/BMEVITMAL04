import { useState } from "react";
import useHttpGet from "@/api/useHttpGet";
import { toast } from "sonner";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import { CustomerTable } from "@/components/tables/CustomerTable";

export default function Customers() {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(25);

  const query = useHttpGet<PagableResourceWrapper<Customer[]>>(
    `/api/customers?per_page=${rows}&page=${page}`
  );

  if (query.error) {
    toast.error(query.error.name || "Failed to load customers.");
  }

  const breadcrumbs = [{ label: "Customers", url: "/app/customers" }];

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <div className="rounded-lg shadow my-4">
        <CustomerTable
          value={query.data?.data || []}
          loading={query.isLoading || query.isFetching}
          title="Customers"
          paginationProps={{
            totalRecords: query.data?.total,
            rows: rows,
            page: page,
            setRows: setRows,
            setPage: setPage,
          }}
        />
      </div>
    </div>
  );
}
