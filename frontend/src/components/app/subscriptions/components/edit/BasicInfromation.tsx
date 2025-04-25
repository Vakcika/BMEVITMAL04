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
          value={values.customer?.id?.toString() ?? "0"}
          onChange={(value) => {
            const selectedCustomer = customers.find(
              (c) => c.id === Number(value)
            );
            setFieldValue("customer", {
              id: Number(value),
              ...selectedCustomer,
            });
          }}
          error={touched.customer?.id && (errors.customer?.id as string)}
          options={customers.map((customer) => ({
            value: customer.id.toString(),
            label: customer.company_name,
          }))}
          placeholder="Select customer"
        />

        <FormSelect
          label="Billing Cycle*"
          name="billing_cycle"
          value={values.billing_cycle?.id?.toString() ?? "0"}
          onChange={(value) => {
            const selectedCycle = billingCycles.find(
              (c) => c.id === Number(value)
            );
            setFieldValue("billing_cycle", {
              id: Number(value),
              ...selectedCycle,
            });
          }}
          error={
            touched.billing_cycle?.id && (errors.billing_cycle?.id as string)
          }
          options={billingCycles.map((cycle) => ({
            value: cycle.id.toString(),
            label: cycle.name,
          }))}
          placeholder="Select billing cycle"
        />
      </div>
    </div>
  );
}
