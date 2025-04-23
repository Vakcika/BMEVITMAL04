import useHttpGet from "@/api/useHttpGet";
import useHttpPost from "@/api/useHttpPost";
import useHttpPut from "@/api/useHttpPut";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import LoadingCircle from "@/components/common/LoadingCircle";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useAuth } from "@webbydevs/react-laravel-sanctum-auth";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UUID } from "crypto";
import { Currency, Transaction, TransactionType } from "@/types/Transaction";

const TransactionSchema = Yup.object().shape({
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

export default function EditTransaction({ isNew = false }) {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const initialValues: Transaction = {
    id: "" as UUID,
    customer: { id: 0 } as Customer,
    currency: { id: 0 } as Currency,
    transaction_type: { id: 0 } as TransactionType,
    subscription: null,
    created_by: user,
    amount: 0,
    amount_in_base: 0,
    transaction_date: null,
    due_date: null,
    payment_date: null,
    note: null,
    created_at: "",
    updated_at: "",
  };

  const query = isNew
    ? {
        data: { data: initialValues },
        isLoading: false,
        error: null,
      }
    : useHttpGet<{ data: Transaction }>(`/api/transactions/${id}`);

  if (query.error) {
    toast.error(query.error.name || "Failed to load transaction.");
    console.error(query.error);
  }

  const customersQuery = useHttpGet<{ data: Customer[] }>("/api/customers");
  if (customersQuery.error) {
    toast.error(customersQuery.error.name || "Failed to load customers.");
    console.error(customersQuery.error);
  }

  const currenciesQuery = useHttpGet<Currency[]>("/api/currencies");
  if (currenciesQuery.error) {
    toast.error(currenciesQuery.error.name || "Failed to load currencies.");
    console.error(currenciesQuery.error);
  }

  const transactionTypesQuery = useHttpGet<TransactionType[]>(
    "/api/transaction-types"
  );
  if (transactionTypesQuery.error) {
    toast.error(
      transactionTypesQuery.error.name || "Failed to load transaction types."
    );
    console.error(transactionTypesQuery.error);
  }

  const subscriptionsQuery = useHttpGet<{ data: Subscription[] }>(
    "/api/subscriptions"
  );
  if (subscriptionsQuery.error) {
    toast.error(
      subscriptionsQuery.error.name || "Failed to load subscriptions."
    );
    console.error(subscriptionsQuery.error);
  }

  const updateMutation = useHttpPut("/api/transactions");
  const createMutation = useHttpPost("/api/transactions");

  const handleSubmit = async (values: Transaction) => {
    let newValues: Partial<
      Transaction & {
        customer_id: number;
        currency_id: number;
        created_by_id: number;
        subscription_id: number | null;
        transaction_type_id: number;
      }
    > = { ...values };

    newValues["customer_id"] = values.customer.id;
    newValues["currency_id"] = values.currency.id;
    newValues["created_by_id"] = user.user.id;
    newValues["subscription_id"] = values.subscription?.id;
    newValues["transaction_type_id"] = values.transaction_type.id;

    delete newValues["customer"];
    delete newValues["currency"];
    delete newValues["created_by"];
    delete newValues["subscription"];
    delete newValues["transaction_type"];

    try {
      if (!isNew) {
        await updateMutation.mutateAsync(newValues);
        toast.success("Transaction updated successfully");
        navigate(`/app/transactions/${id}`);
      } else {
        const { data } = await createMutation.mutateAsync(newValues);
        toast.success("Transaction created successfully");

        if (data) {
          navigate(`/app/transactions/${data.id}`);
        } else {
          navigate("/app/transactions");
        }
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? error?.message ?? "Failed to save"
      );
      console.error(error);
    }
  };

  const handleCancel = () => {
    if (isNew) {
      navigate("/app/transactions");
    } else {
      navigate(`/app/transactions/${id}`);
    }
  };

  const breadcrumbs = [
    { label: "Transactions", url: "/app/transactions" },
    {
      label: isNew ? "New Transaction" : `#${id?.substring(0, 8)}`,
      url: isNew ? "" : `/app/transactions/${id}`,
    },
  ];

  if (!isNew && query.isLoading) {
    return <LoadingCircle />;
  }

  return (
    <div className="p-4">
      <CustomBreadCrumb model={breadcrumbs} />
      <div className="mt-6 mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          {isNew ? "Create Transaction" : `Edit: #${id?.substring(0, 8)}`}
        </h1>
      </div>

      <Card className="bg-white rounded-lg shadow">
        <CardHeader>
          <CardTitle>Transaction Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={(!isNew && query.data?.data) || initialValues}
            validationSchema={TransactionSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-4">
                  <div className="space-y-4 xl:col-span-2">
                    <h3 className="text-lg font-medium">Basic Information</h3>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-1 xl:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="customer">Customer*</Label>
                        <Select
                          name="customer"
                          value={values.customer.id.toString()}
                          onValueChange={(value) => {
                            const selectedCustomer =
                              customersQuery.data?.data.find(
                                (c) => c.id === Number(value)
                              );
                            setFieldValue("customer", {
                              id: Number(value),
                              ...selectedCustomer,
                            });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select customer" />
                          </SelectTrigger>
                          <SelectContent>
                            {customersQuery.data?.data.map((customer) => (
                              <SelectItem
                                key={customer.id}
                                value={customer.id.toString()}
                              >
                                {customer.company_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {touched.customer?.id && errors.customer?.id && (
                          <p className="text-sm text-w300 mt-1">
                            {errors.customer.id}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="transaction_type">
                          Transaction Type*
                        </Label>
                        <Select
                          name="transaction_type"
                          value={values.transaction_type.id.toString()}
                          onValueChange={(value) => {
                            const selectedType =
                              transactionTypesQuery.data?.find(
                                (t) => t.id === Number(value)
                              );
                            setFieldValue("transaction_type", {
                              id: Number(value),
                              ...selectedType,
                            });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select transaction type" />
                          </SelectTrigger>
                          <SelectContent>
                            {transactionTypesQuery.data?.map((type) => (
                              <SelectItem
                                key={type.id}
                                value={type.id.toString()}
                              >
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {touched.transaction_type?.id &&
                          errors.transaction_type?.id && (
                            <p className="text-sm text-w300 mt-1">
                              {errors.transaction_type.id}
                            </p>
                          )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subscription">
                          Subscription (Optional)
                        </Label>
                        <Select
                          name="subscription"
                          value={values.subscription?.id?.toString() ?? "0"}
                          onValueChange={(value) => {
                            if (value === "0") {
                              setFieldValue("subscription", null);
                            } else {
                              const selectedSubscription =
                                subscriptionsQuery.data?.data.find(
                                  (s) => s.id === Number(value)
                                );
                              setFieldValue(
                                "subscription",
                                selectedSubscription || { id: Number(value) }
                              );
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select subscription" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">None</SelectItem>
                            {subscriptionsQuery.data?.data.map(
                              (subscription) => (
                                <SelectItem
                                  key={subscription.id}
                                  value={subscription.id.toString()}
                                >
                                  {subscription.name}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 xl:col-span-2">
                    <h3 className="text-lg font-medium">Financial Details</h3>
                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount*</Label>
                        <Input
                          id="amount"
                          name="amount"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={values.amount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.amount && errors.amount && (
                          <p className="text-sm text-w300 mt-1">
                            {errors.amount}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency*</Label>
                        <Select
                          name="currency"
                          value={values.currency.id.toString()}
                          onValueChange={(value) => {
                            const selectedCurrency = currenciesQuery.data?.find(
                              (c) => c.id === Number(value)
                            );
                            setFieldValue("currency", {
                              id: Number(value),
                              ...selectedCurrency,
                            });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            {currenciesQuery.data?.map((currency) => (
                              <SelectItem
                                key={currency.id}
                                value={currency.id.toString()}
                              >
                                {currency.code} ({currency.symbol})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {touched.currency?.id && errors.currency?.id && (
                          <p className="text-sm text-w300 mt-1">
                            {errors.currency.id}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 xl:col-span-2">
                    <h3 className="text-lg font-medium">Dates</h3>
                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="transaction_date">
                          Transaction Date*
                        </Label>
                        <Input
                          id="transaction_date"
                          name="transaction_date"
                          type="datetime-local"
                          value={values.transaction_date ?? ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.transaction_date &&
                          errors.transaction_date && (
                            <p className="text-sm text-w300 mt-1">
                              {errors.transaction_date}
                            </p>
                          )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="due_date">Due Date</Label>
                        <Input
                          id="due_date"
                          name="due_date"
                          type="date"
                          value={values.due_date ?? ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.due_date && errors.due_date && (
                          <p className="text-sm text-w300 mt-1">
                            {errors.due_date}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="payment_date">Payment Date</Label>
                        <Input
                          id="payment_date"
                          name="payment_date"
                          type="date"
                          value={values.payment_date ?? ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.payment_date && errors.payment_date && (
                          <p className="text-sm text-w300 mt-1">
                            {errors.payment_date}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="note">Notes</Label>
                    <Textarea
                      id="note"
                      name="note"
                      placeholder="Additional notes about this transaction"
                      value={values.note ?? ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={4}
                    />
                    {touched.note && errors.note && (
                      <p className="text-sm text-w300 mt-1">{errors.note}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="ghost" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting
                      ? isNew
                        ? "Creating..."
                        : "Saving..."
                      : isNew
                      ? "Create Transaction"
                      : "Save Changes"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
