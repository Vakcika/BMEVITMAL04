import { FormikProps } from "formik";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface AddressProps {
  formik: FormikProps<Customer>;
}

export default function Address({ formik }: Readonly<AddressProps>) {
  const { values, errors, touched, handleChange, handleBlur } = formik;

  return (
    <div className="space-y-2 md:col-span-2">
      <Label htmlFor="address">Address</Label>
      <Textarea
        id="address"
        name="address"
        placeholder="Enter full address"
        value={values.address ?? ""}
        onChange={handleChange}
        onBlur={handleBlur}
        rows={3}
      />
      {touched.address && errors.address && (
        <p className="text-sm text-w300 mt-1">{errors.address}</p>
      )}
    </div>
  );
}
