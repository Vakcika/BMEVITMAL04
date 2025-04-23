import { Transaction, TransactionType } from "@/types/Transaction";
import { FormikErrors, FormikTouched } from "formik";
import { FormSelect } from "../../../../common/form/FormSelect";

interface BasicInformationSectionProps {
  values: Transaction;
  errors: FormikErrors<Transaction>;
  touched: FormikTouched<Transaction>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  customers: Customer[];
  transactionTypes: TransactionType[];
  subscriptions: Subscription[];
}

export default function BasicInformation({
  values,
  errors,
  touched,
  setFieldValue,
  customers,
  transactionTypes,
  subscriptions,
}: Readonly<BasicInformationSectionProps>) {
  return (
    <div className="space-y-4 xl:col-span-2">
      <h3 className="text-lg font-medium">Basic Information</h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-1 xl:grid-cols-3">
        <FormSelect
          label="Customer*"
          name="customer"
          value={values.customer.id.toString()}
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
          label="Transaction Type*"
          name="transaction_type"
          value={values.transaction_type.id.toString()}
          onChange={(value) => {
            const selectedType = transactionTypes.find(
              (t) => t.id === Number(value)
            );
            setFieldValue("transaction_type", {
              id: Number(value),
              ...selectedType,
            });
          }}
          error={
            touched.transaction_type?.id &&
            (errors.transaction_type?.id as string)
          }
          options={transactionTypes.map((type) => ({
            value: type.id.toString(),
            label: type.name,
          }))}
          placeholder="Select transaction type"
        />

        <FormSelect
          label="Subscription (Optional)"
          name="subscription"
          value={values.subscription?.id?.toString() ?? "0"}
          onChange={(value) => {
            if (value === "0") {
              setFieldValue("subscription", null);
            } else {
              const selectedSubscription = subscriptions.find(
                (s) => s.id === Number(value)
              );
              setFieldValue(
                "subscription",
                selectedSubscription || { id: Number(value) }
              );
            }
          }}
          options={[
            { value: "0", label: "None" },
            ...subscriptions.map((subscription) => ({
              value: subscription.id.toString(),
              label: subscription.name,
            })),
          ]}
          placeholder="Select subscription"
        />
      </div>
    </div>
  );
}
