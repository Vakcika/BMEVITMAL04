import { Subscription, BillingCycle } from "@/types/Subscription";
import { FormikErrors, FormikTouched } from "formik";
import { ChangeEvent, FocusEvent } from "react";
import { FormSelect } from "@/components/common/form/FormSelect";
import { FormInput } from "@/components/common/form/FormInput";

interface BasicInformationSectionProps {
  values: Subscription;
  errors: FormikErrors<Subscription>;
  touched: FormikTouched<Subscription>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  handleChange: (e: ChangeEvent<any>) => void;
  handleBlur: (e: FocusEvent<any>) => void;
  customers: Customer[];
  billingCycles: BillingCycle[];
}

export default function BasicInformation({
  values,
  errors,
  touched,
  setFieldValue,
  handleChange,
  handleBlur,
  customers,
  billingCycles,
}: Readonly<BasicInformationSectionProps>) {
  return (
    <div className="space-y-4 xl:col-span-2">
      <h3 className="text-lg font-medium">Basic Information</h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-1 xl:grid-cols-3">
        <FormInput
          id="name"
          name="name"
          label="Subscription Name*"
          type="text"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && (errors.name as string)}
          placeholder="Enter subscription name"
        />

        <FormSelect
          label="Customer*"
          name="customer"
          value={values.customer?.id?.toString() ?? ""}
          onChange={(value, selected) =>
            setFieldValue("customer", {
              id: Number(value),
              ...selected,
            })
          }
          options={customers}
          getOptionValue={(c) => c.id.toString()}
          getOptionLabel={(c) => c.company_name}
          placeholder="Select customer"
          emptyLabel="None"
          error={touched.customer?.id && (errors.customer?.id as string)}
        />

        <FormSelect
          label="Billing Cycle*"
          name="billing_cycle"
          value={values.billing_cycle?.id?.toString() ?? ""}
          onChange={(value, selected) =>
            setFieldValue("billing_cycle", {
              id: Number(value),
              ...selected,
            })
          }
          options={billingCycles}
          getOptionValue={(b) => b.id.toString()}
          getOptionLabel={(b) => b.name}
          placeholder="Select billing cycle"
          error={
            touched.billing_cycle?.id && (errors.billing_cycle?.id as string)
          }
        />
      </div>
    </div>
  );
}
