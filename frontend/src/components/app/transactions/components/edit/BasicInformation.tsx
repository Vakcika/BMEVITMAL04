import { Transaction, TransactionType } from "@/types/Transaction";
import { FormikErrors, FormikTouched } from "formik";
import { FormSelect } from "../../../../common/form/FormSelect";
import { Subscription } from "@/types/Subscription";

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
          label="Transaction Type*"
          name="transaction_type"
          value={values.transaction_type.id.toString()}
          onChange={(value, selected) =>
            setFieldValue("transaction_type", {
              id: Number(value),
              ...selected,
            })
          }
          options={transactionTypes}
          getOptionValue={(t) => t.id.toString()}
          getOptionLabel={(t) => t.name}
          placeholder="Select transaction type"
          error={
            touched.transaction_type?.id &&
            (errors.transaction_type?.id as string)
          }
        />

        <FormSelect
          label="Subscription (Optional)"
          name="subscription"
          value={values.subscription?.id?.toString() ?? ""}
          onChange={(value, selected) =>
            setFieldValue("subscription", {
              id: Number(value),
              ...selected,
            })
          }
          options={subscriptions}
          getOptionValue={(s) => s.id.toString()}
          getOptionLabel={(s) => s.name}
          placeholder="Select subscription"
          emptyLabel="None"
        />
      </div>
    </div>
  );
}
