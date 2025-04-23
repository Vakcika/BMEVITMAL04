import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputHTMLAttributes, ChangeEvent, FocusEvent } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  error?: string | boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

export function FormInput({
  id,
  name,
  label,
  error,
  ...props
}: Readonly<FormInputProps>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={name} {...props} />
      {error && (
        <p className="text-sm text-w300 mt-1">
          {typeof error === "string" ? error : undefined}
        </p>
      )}
    </div>
  );
}
