import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Formik, Form, FormikHelpers } from "formik";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import LoadingCircle from "@/components/common/LoadingCircle";
import { Transaction } from "@/types/Transaction";
import BasicInformation from "./components/edit/BasicInformation.tsx";
import Dates from "./components/edit/Dates.tsx";
import FinancialDetails from "./components/edit/FinancialDetails.tsx";
import Note from "./components/edit/Note.tsx";
import { TransactionSchema } from "../validationSchemas.tsx";
import { useTransactionData } from "./hooks/useTransactionData.ts";
import { useTransactionMutations } from "./hooks/useTransactionDataMutation.ts";
import FormActions from "@/components/common/form/FormAction.tsx";
import useFormOptions from "../hooks/useFormOptions.ts";

interface EditTransactionProps {
  isNew?: boolean;
}

export default function EditTransaction({
  isNew = false,
}: Readonly<EditTransactionProps>) {
  const [searchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { customers, currencies, transactionTypes, subscriptions } =
    useFormOptions();

  const customerId = searchParams.get("customer");
  const currency = searchParams.get("currency");
  const transactionTypeId = searchParams.get("transactionTypeId");
  const subscriptionId = searchParams.get("subscription");
  const amount = searchParams.get("amount");

  const { initialValues, isLoading } = useTransactionData(isNew, id, {
    customerId,
    currency,
    transactionTypeId,
    subscriptionId,
    amount,
  });

  const { createTransaction, updateTransaction } = useTransactionMutations();

  const handleSubmit = async (
    values: Transaction,
    { setSubmitting }: FormikHelpers<Transaction>
  ) => {
    try {
      if (isNew) {
        const { data } = await createTransaction(values);
        toast.success("Transaction created successfully");
        if (data) {
          navigate(`/app/transaction/${data.id}`);
        } else {
          navigate("/app/transaction");
        }
      } else {
        await updateTransaction(values);
        toast.success("Transaction updated successfully");
        navigate(`/app/transaction/${id}`);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ?? error?.message ?? "Failed to save"
      );
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isNew) {
      navigate("/app/transaction");
    } else {
      navigate(`/app/transaction/${id}`);
    }
  };

  const breadcrumbs = [
    { label: "Transactions", url: "/app/transactions" },
    {
      label: isNew ? "New Transaction" : `#${id?.substring(0, 8)}`,
      url: isNew ? "" : `/app/transaction/${id}`,
    },
  ];

  if (!isNew && isLoading) {
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
          <Formik<Transaction>
            initialValues={initialValues}
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
                  <BasicInformation
                    values={values}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                    customers={customers}
                    transactionTypes={transactionTypes}
                    subscriptions={subscriptions}
                  />

                  <FinancialDetails
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    currencies={currencies}
                  />

                  <Dates
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />

                  <Note
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <FormActions
                    isSubmitting={isSubmitting}
                    onCancel={handleCancel}
                    submitText={isNew ? "Create transaction" : "Save"}
                    submittingText={
                      isNew ? "Creating transaction" : "Saving..."
                    }
                  />
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
