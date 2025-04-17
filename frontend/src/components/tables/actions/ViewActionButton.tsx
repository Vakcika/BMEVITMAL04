import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ViewActionButtonProps<T> {
  item: T;
  onClick: (item: T) => void;
  className?: string;
}

export function ViewActionButton<T>({
  item,
  onClick,
  className = "",
}: Readonly<ViewActionButtonProps<T>>) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onClick(item)}
      className={`h-8 w-8 p-0 ${className}`}
    >
      <Eye className="h-4 w-4" />
    </Button>
  );
}
