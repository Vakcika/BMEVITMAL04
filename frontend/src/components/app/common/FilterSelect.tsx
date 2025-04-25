import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Option = {
  label: string;
  value: string;
};

type FilterSelectProps = {
  label: string;
  paramKey: string;
  options: Option[];
  searchParams: URLSearchParams;
  setSearchParams: (
    params: URLSearchParams,
    options?: { replace: boolean }
  ) => void;
  disabled?: boolean;
};

export default function FilterSelect({
  label,
  paramKey,
  options,
  searchParams,
  setSearchParams,
  disabled = false,
}: Readonly<FilterSelectProps>) {
  const value = searchParams.get(paramKey) ?? "all";

  const handleChange = (val: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (val === "all") {
      newParams.delete(paramKey);
    } else {
      newParams.set(paramKey, val);
    }
    setSearchParams(newParams, { replace: true });
  };

  return (
    <Select value={value} onValueChange={handleChange} disabled={disabled}>
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder={`Filter: ${label}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{`All ${label}`}</SelectItem>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
