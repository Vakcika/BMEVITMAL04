import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export type CustomPaginationProps = {
  totalRecords: number | undefined;
  rows: number;
  page: number;
  setRows: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
};

export const PaginationControls = ({
  totalRecords,
  rows,
  page,
  setPage,
  className,
}: CustomPaginationProps) => {
  const totalPages = Math.ceil((totalRecords ?? 0) / rows);

  return (
    <div className={`flex items-center justify-between p-4 ${className}`}>
      <Pagination>
        <PaginationContent className="flex items-center gap-2">
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(1)}
              disabled={page === 1}
              title="First page"
            >
              <ChevronsLeft className="h-4 w-4" />
              <span className="sr-only">Go to first page</span>
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              onClick={() => page > 1 && setPage(page - 1)}
              disabled={page === 1}
              title="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Go to previous page</span>
            </Button>
          </PaginationItem>
          <PaginationItem>
            <span className="text-sm">
              page {page} of {totalPages}
            </span>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              onClick={() => page < totalPages && setPage(page + 1)}
              disabled={page === totalPages}
              title="Next page"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Go to next page</span>
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              title="Last page"
            >
              <ChevronsRight className="h-4 w-4" />
              <span className="sr-only">Go to last page</span>
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
