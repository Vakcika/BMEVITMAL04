import { Transaction, Currency } from "@/types/Transaction";
import { FormikErrors, FormikTouched } from "formik";
import { ChangeEvent, FocusEvent } from "react";
import { FormInput } from "../../../../common/form/FormInput";
import { FormSelect } from "../../../../common/form/FormSelect";

interface FinancialDetailsSectionProps {
  values: Transaction;
  errors: FormikErrors<Transaction>;
  touched: FormikTouched<Transaction>;
  handleChange: (e: ChangeEvent<any>) => void;
  handleBlur: (e: FocusEvent<any>) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  currencies: Currency[];
}

export default function FinancialDetail({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  currencies,
}: Readonly<FinancialDetailsSectionProps>) {
  return (
    <div className="space-y-4 xl:col-span-2">
      <h3 className="text-lg font-medium">Financial Details</h3>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <FormInput
          id="amount"
          name="amount"
          label="Amount*"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={values.amount}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.amount && (errors.amount as string)}
        />

        <FormSelect
          label="Currency*"
          name="currency"
          value={values.currency.id.toString()}
          onChange={(value) => {
            const selectedCurrency = currencies.find(
              (c) => c.id === Number(value)
            );
            setFieldValue("currency", {
              id: Number(value),
              ...selectedCurrency,
            });
          }}
          error={touched.currency?.id && (errors.currency?.id as string)}
          options={currencies.map((currency) => ({
            value: currency.id.toString(),
            label: `${currency.code} (${currency.symbol})`,
          }))}
          placeholder="Select currency"
        />
      </div>
    </div>
  );
}
