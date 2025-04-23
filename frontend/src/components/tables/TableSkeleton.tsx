import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export interface TableSkeletonProps {
  title?: boolean;
  rowCount?: number;
  columnCount?: number;
  columnWidths?: string[];
  showActions?: boolean;
  actionCount?: number;
  showPagination?: boolean;
  showPageSizeSelector?: boolean;
}

export const TableSkeleton = ({
  title = true,
  rowCount = 5,
  columnCount = 6,
  columnWidths = ["w-12", "w-36", "w-40", "w-32", "w-48", "w-20"],
  showActions = true,
  actionCount = 2,
  showPagination = true,
  showPageSizeSelector = true,
}: TableSkeletonProps) => {
  const rows = Array(rowCount).fill(0);
  const columns = Array(columnCount).fill(0);

  const normalizedColumnWidths = [...columnWidths];
  while (normalizedColumnWidths.length < columnCount) {
    normalizedColumnWidths.push("w-32");
  }

  return (
    <Card>
      {title && (
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            <Skeleton className="h-8 w-40" />
          </CardTitle>
          {showPageSizeSelector && (
            <Skeleton className="h-10 w-36 rounded-md" />
          )}
        </CardHeader>
      )}
      <CardContent className="flex flex-col min-h-80">
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((_, index) => (
                  <TableHead key={`header-${index}`}>
                    <Skeleton className="h-4 w-24" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((_, rowIndex) => (
                <TableRow key={`row-${rowIndex}`}>
                  {columns.map((_, colIndex) => (
                    <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                      {colIndex === columnCount - 1 && showActions ? (
                        <div className="flex space-x-2">
                          {Array(actionCount)
                            .fill(0)
                            .map((_, actionIndex) => (
                              <Skeleton
                                key={`action-${rowIndex}-${actionIndex}`}
                                className="h-8 w-8 rounded-md"
                              />
                            ))}
                        </div>
                      ) : (
                        <Skeleton
                          className={`h-4 ${normalizedColumnWidths[colIndex]}`}
                        />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {showPagination && (
          <div className="mt-4 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-12 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
