import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Transaction } from "@/types/Transaction";
import { FormikErrors, FormikTouched } from "formik";
import { ChangeEvent, FocusEvent } from "react";

interface NotesSectionProps {
  values: Transaction;
  errors: FormikErrors<Transaction>;
  touched: FormikTouched<Transaction>;
  handleChange: (e: ChangeEvent<any>) => void;
  handleBlur: (e: FocusEvent<any>) => void;
}

export default function Note({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}: Readonly<NotesSectionProps>) {
  return (
    <div className="space-y-2 md:col-span-2">
      <Label htmlFor="note">Notes</Label>
      <Textarea
        id="note"
        name="note"
        placeholder="Additional notes about this transaction"
        value={values.note ?? ""}
        onChange={handleChange}
        onBlur={handleBlur}
        rows={4}
      />
      {touched.note && errors.note && (
        <p className="text-sm text-w300 mt-1">{errors.note}</p>
      )}
    </div>
  );
}
