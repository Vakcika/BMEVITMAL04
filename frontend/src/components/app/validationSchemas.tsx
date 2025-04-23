import * as Yup from "yup";

export const TransactionSchema = Yup.object().shape({
  customer: Yup.object({
    id: Yup.number().min(1, "Customer is required").required(),
  }).required(),
  currency: Yup.object({
    id: Yup.number().min(1, "Currency is required").required(),
  }).required(),
  transaction_type: Yup.object({
    id: Yup.number().min(1, "Transaction type is required").required(),
  }).required(),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  transaction_date: Yup.date().required("Transaction date is required"),
  due_date: Yup.date().nullable(),
  payment_date: Yup.date().nullable(),
  note: Yup.string().nullable(),
});
