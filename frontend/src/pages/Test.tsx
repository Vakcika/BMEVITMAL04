import { useState } from "react";
import useHttpGet from "@/api/useHttpGet";
import { toast } from "sonner";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import { TestTable } from "@/components/tables/TestTable";

export default function Test() {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(25);

  const query = useHttpGet<PagableResourceWrapper<Email[]>>(
    `/api/emails?per_page=${rows}&page=${page}`
  );

  if (query.error) {
    toast.error(query.error.name);
  }

  const breadcrumbs = [{ label: "Emails", url: "/app/test" }];

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <div className=" rounded-lg shadow my-4">
        <TestTable
          value={query.data?.data || []}
          loading={query.isLoading || query.isFetching}
          title="Emails"
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
