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

export const CustomerSchema = Yup.object().shape({
  name: Yup.string().required("Contact name is required"),
  company_name: Yup.string().required("Company name is required"),
  user: Yup.object({
    id: Yup.number().required("Assignee is required"),
    name: Yup.string().nullable(),
  }).required("Assignee is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone_number: Yup.string(),
  status: Yup.object({
    id: Yup.number().required("Status is required"),
    name: Yup.string().nullable(),
  }).required("Status is required"),
  website: Yup.string().url("Must be a valid URL").nullable(),
  tax_number: Yup.string().nullable(),
  address: Yup.string().nullable(),
  description: Yup.string().nullable(),
});

export const LogSchema = Yup.object().shape({
  customer: Yup.object({
    id: Yup.number().min(1, "Customer is required").required(),
  }).required(),
  type: Yup.object({
    id: Yup.number().min(1, "Log type is required").required(),
  }).required(),
  follow_up_date: Yup.string().nullable(),
  description: Yup.string().required("Description is required"),
});
