import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FormSelectProps<T> {
  name: string;
  label: string;
  value: string;
  onChange: (value: string, selected?: T | null) => void;
  options: T[];
  getOptionValue: (option: T) => string;
  getOptionLabel: (option: T) => string;
  placeholder: string;
  error?: string | boolean;
  emptyLabel?: string;
}

export function FormSelect<T>({
  name,
  label,
  value,
  onChange,
  options,
  getOptionValue,
  getOptionLabel,
  placeholder,
  error,
  emptyLabel,
}: Readonly<FormSelectProps<T>>) {
  const selectedOption = options.find((o) => getOptionValue(o) === value);
  const selectedLabel =
    value === "all" && emptyLabel
      ? emptyLabel
      : selectedOption
      ? getOptionLabel(selectedOption)
      : undefined;

  const handleSelectAll = () => {
    onChange("all", null);
  };

  const handleSelectOption = (val: string) => {
    const selected = options.find((o) => getOptionValue(o) === val);
    onChange(val, selected);
  };

  const handleChange = (val: string) => {
    if (emptyLabel && val === "all") {
      handleSelectAll();
    } else {
      handleSelectOption(val);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Select name={name} value={value} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder}>
            {selectedLabel || placeholder}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {emptyLabel && <SelectItem value="all">{emptyLabel}</SelectItem>}
          {options.map((option) => (
            <SelectItem
              key={getOptionValue(option)}
              value={getOptionValue(option)}
            >
              {getOptionLabel(option)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-sm text-w300 mt-1">
          {typeof error === "string" ? error : undefined}
        </p>
      )}
    </div>
  );
}
