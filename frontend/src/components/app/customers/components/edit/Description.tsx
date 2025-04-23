import { FormikProps } from "formik";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface DescriptionProps {
  formik: FormikProps<Customer>;
}

export default function Description({ formik }: Readonly<DescriptionProps>) {
  const { values, errors, touched, handleChange, handleBlur } = formik;

  return (
    <div className="space-y-2 md:col-span-2">
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        name="description"
        placeholder="Additional notes or description"
        value={values.description ?? ""}
        onChange={handleChange}
        onBlur={handleBlur}
        rows={4}
      />
      {touched.description && errors.description && (
        <p className="text-sm text-w300 mt-1">{errors.description}</p>
      )}
    </div>
  );
}
