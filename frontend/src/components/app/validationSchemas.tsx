import * as Yup from "yup";

export const TransactionSchema = Yup.object().shape({
  customer: Yup.object({
    id: Yup.number().min(1, "Customer is required").required(),
  }).required(),
  currency: Yup.object({
    code: Yup.string()
      .required("You must select a currency")
      .notOneOf(["all"], "You must select a currency"),
  }).required("You must select a currency"),
  subscription: Yup.object({
    id: Yup.number().required("Invalid subscription"),
  })
    .nullable()
    .notRequired(),
  transaction_type: Yup.object({
    id: Yup.number().min(1, "Transaction type is required").required(),
  }).required(),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  transaction_date: Yup.date()
    .required("Transaction date is required")
    .typeError("Transaction date must be a valid date"),
  due_date: Yup.date()
    .nullable()
    .typeError("Due date must be a valid date")
    .test("due-after-transaction", function (dueDate) {
      const transactionDate = this.parent.transaction_date;
      if (dueDate && transactionDate) {
        const dueDateOnly = new Date(dueDate.toDateString());
        const transactionDateOnly = new Date(transactionDate.toDateString());

        if (dueDateOnly < transactionDateOnly) {
          return this.createError({
            message: "Due date cannot be earlier than transaction date",
          });
        }
      }
      return true;
    }),
  payment_date: Yup.date()
    .nullable()
    .typeError("Payment date must be a valid date")
    .test("payment-after-transaction", function (paymentDate) {
      const transactionDate = this.parent.transaction_date;
      if (paymentDate && transactionDate) {
        const paymentDateOnly = new Date(paymentDate);
        paymentDateOnly.setHours(0, 0, 0, 0);

        const transactionDateOnly = new Date(transactionDate);
        transactionDateOnly.setHours(0, 0, 0, 0);

        if (paymentDateOnly < transactionDateOnly) {
          return this.createError({
            message: "Payment date cannot be earlier than transaction date",
          });
        }
      }
      return true;
    }),

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

export const SubscriptionSchema = Yup.object().shape({
  name: Yup.string().required("Subscription name is required"),
  customer: Yup.object().shape({
    id: Yup.number().required("Customer is required"),
  }),
  billing_cycle: Yup.object().shape({
    id: Yup.number()
      .notOneOf([0], "Billing cycle is required")
      .required("Billing cycle is required"),
  }),
  currency: Yup.object().shape({
    id: Yup.number()
      .notOneOf([0], "Currency is required")
      .required("Currency is required"),
  }),
  amount: Yup.number()
    .required("Amount is required")
    .min(0, "Amount must be greater than or equal to 0"),
  start_date: Yup.date().nullable().required("Start date is required"),
  end_date: Yup.date()
    .nullable()
    .min(Yup.ref("start_date"), "End date must be after start date"),
});
