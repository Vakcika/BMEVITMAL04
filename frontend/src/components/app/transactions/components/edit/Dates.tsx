import { Transaction } from "@/types/Transaction";
import { FormikErrors, FormikTouched } from "formik";
import { ChangeEvent, FocusEvent } from "react";
import { FormInput } from "../../../../common/form/FormInput";

interface DatesSectionProps {
  values: Transaction;
  errors: FormikErrors<Transaction>;
  touched: FormikTouched<Transaction>;
  handleChange: (e: ChangeEvent<any>) => void;
  handleBlur: (e: FocusEvent<any>) => void;
}

export default function Dates({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}: Readonly<DatesSectionProps>) {
  return (
    <div className="space-y-4 xl:col-span-2">
      <h3 className="text-lg font-medium">Dates</h3>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <FormInput
          id="transaction_date"
          name="transaction_date"
          label="Transaction Date*"
          type="datetime-local"
          value={values.transaction_date ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.transaction_date && (errors.transaction_date as string)
          }
        />

        <FormInput
          id="due_date"
          name="due_date"
          label="Due Date"
          type="date"
          value={values.due_date ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.due_date && (errors.due_date as string)}
        />

        <FormInput
          id="payment_date"
          name="payment_date"
          label="Payment Date"
          type="date"
          value={values.payment_date ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.payment_date && (errors.payment_date as string)}
        />
      </div>
    </div>
  );
}
