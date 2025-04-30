import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Formik, Form, FormikHelpers } from "formik";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import LoadingCircle from "@/components/common/LoadingCircle";
import { Subscription } from "@/types/Subscription";
import { SubscriptionSchema } from "../validationSchemas";
import { useSubscriptionData } from "./hooks/useSubscriptionData";
import { useSubscriptionMutations } from "./hooks/useSubscriptionDataMutation";
import FormActions from "@/components/common/form/FormAction";
import BasicInformation from "./components/edit/BasicInfromation";
import FinancialDetails from "./components/edit/FinancialDetails";
import SubscriptionDates from "./components/edit/SubscriptionDates";
import useFormOptions from "../hooks/useFormOptions.ts";

interface EditSubscriptionProps {
  isNew?: boolean;
}

export default function EditSubscription({
  isNew = false,
}: Readonly<EditSubscriptionProps>) {
  const [searchParams] = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { customers, currencies, billingCycles } = useFormOptions();

  const customerId = searchParams.get("customer");
  const { initialValues, isLoading } = useSubscriptionData(isNew, id, {
    customerId,
  });

  const { createSubscription, updateSubscription } = useSubscriptionMutations();

  const handleSubmit = async (
    values: Subscription,
    { setSubmitting }: FormikHelpers<Subscription>
  ) => {
    try {
      if (isNew) {
        const { data } = await createSubscription(values);
        toast.success("Subscription created successfully");
        if (data) {
          navigate(`/app/subscription/${data.id}`);
        } else {
          navigate("/app/subscriptions");
        }
      } else {
        await updateSubscription(values);
        toast.success("Subscription updated successfully");
        navigate(`/app/subscription/${id}`);
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
      navigate("/app/subscriptions");
    } else {
      navigate(`/app/subscription/${id}`);
    }
  };

  const breadcrumbs = [
    { label: "Subscriptions", url: "/app/subscriptions" },
    {
      label: isNew ? "New Subscription" : `#${id}`,
      url: isNew ? "" : `/app/subscription/${id}`,
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
          {isNew ? "Create Subscription" : `Edit Subscription: #${id}`}
        </h1>
      </div>

      <Card className="bg-white rounded-lg shadow">
        <CardHeader>
          <CardTitle>Subscription Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik<Subscription>
            initialValues={initialValues}
            validationSchema={SubscriptionSchema}
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
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    customers={customers}
                    billingCycles={billingCycles}
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

                  <SubscriptionDates
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
                    submitText={isNew ? "Create subscription" : "Save"}
                    submittingText={
                      isNew ? "Creating subscription" : "Saving..."
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
