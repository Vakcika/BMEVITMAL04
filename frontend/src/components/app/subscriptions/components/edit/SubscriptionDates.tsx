import { Subscription } from "@/types/Subscription";
import { FormikErrors, FormikTouched } from "formik";
import { ChangeEvent, FocusEvent } from "react";
import { FormInput } from "@/components/common/form/FormInput";

interface SubscriptionDatesSectionProps {
  values: Subscription;
  errors: FormikErrors<Subscription>;
  touched: FormikTouched<Subscription>;
  handleChange: (e: ChangeEvent<any>) => void;
  handleBlur: (e: FocusEvent<any>) => void;
}

export default function SubscriptionDates({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}: Readonly<SubscriptionDatesSectionProps>) {
  return (
    <div className="space-y-4 xl:col-span-2">
      <h3 className="text-lg font-medium">Subscription Period</h3>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <FormInput
          id="start_date"
          name="start_date"
          label="Start Date*"
          type="date"
          value={values.start_date ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.start_date && (errors.start_date as string)}
        />

        <FormInput
          id="end_date"
          name="end_date"
          label="End Date"
          type="date"
          value={values.end_date ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.end_date && (errors.end_date as string)}
        />
      </div>
    </div>
  );
}
