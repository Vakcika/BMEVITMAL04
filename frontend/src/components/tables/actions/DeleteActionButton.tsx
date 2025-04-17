import { useState } from "react";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Variant = "icon" | "lg";

interface DeleteActionButtonProps<T> {
  item: T;
  itemName?: string;
  itemLabel?: string | ((item: T) => string);
  onDelete: (item: T) => void;
  className?: string;
  variant?: Variant;
}

export function DeleteActionButton<T>({
  item,
  itemName = "item",
  itemLabel,
  onDelete,
  className = "",
  variant = "icon",
}: Readonly<DeleteActionButtonProps<T>>) {
  const [open, setOpen] = useState(false);

  const getItemLabel = () => {
    if (!itemLabel) return itemName;
    if (typeof itemLabel === "function") return itemLabel(item);
    return itemLabel;
  };

  const handleDelete = () => {
    onDelete(item);
    setOpen(false);
  };

  return (
    <>
      {variant === "icon" ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpen(true)}
          className={`h-8 w-8 p-0 text-w300 hover:text-n0 ${className}`}
        >
          <Trash className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          size="default"
          onClick={() => setOpen(true)}
          className={` ${className}`}
        >
          <Trash className="h-4 w-4" />
        </Button>
      )}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <strong>{getItemLabel()}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-w300 hover:bg-w400"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
