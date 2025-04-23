import { Button } from "@/components/ui/button";

interface FormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
  submitText: string;
  submittingText?: string;
  cancelText?: string;
}

export default function FormActions({
  isSubmitting,
  onCancel,
  submitText,
  submittingText,
  cancelText = "Cancel",
}: Readonly<FormActionsProps>) {
  return (
    <div className="flex justify-end space-x-2 pt-4">
      <Button type="button" variant="ghost" onClick={onCancel}>
        {cancelText}
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? submittingText ?? `${submitText}...` : submitText}
      </Button>
    </div>
  );
}
