import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import useHttpGet from "@/api/useHttpGet";
import useHttpPut from "@/api/useHttpPut";
import useHttpPost from "@/api/useHttpPost";
import CustomBreadCrumb from "@/components/common/CustomBreadcrumb";
import LoadingCircle from "@/components/common/LoadingCircle";

const CustomerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email address"),
  phone_number: Yup.string(),
  description: Yup.string(),
});

export default function EditCustomer({ isNew = false }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialValues: Customer = {
    id: 0,
    name: "",
    email: "",
    phone_number: "",
    description: "",
    created_at: "",
  };

  const query = isNew
    ? { data: initialValues, isLoading: false, error: null }
    : useHttpGet<Customer>(`/api/customers/${id}`);

  const updateMutation = useHttpPut("/api/customers");
  const createMutation = useHttpPost("/api/customers");

  if (query.error) {
    toast.error(query.error.name || "Failed to load customers.");
    console.error(query.error);
  }

  const handleSubmit = async (values: Customer) => {
    try {
      if (!isNew) {
        await updateMutation.mutateAsync(values);
        toast.success("Customer updated successfully");
        navigate(`/app/customers/${id}`);
      } else {
        const { data } = await createMutation.mutateAsync(values);
        toast.success("Customer created successfully");

        if (data) {
          navigate(`/app/customers/${data.id}`);
        } else {
          navigate("/app/customers");
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
      navigate("/app/customers");
    } else {
      navigate(`/app/customers/${id}`);
    }
  };

  const breadcrumbs = [
    { label: "Customers", url: "/app/customers" },
    {
      label: isNew ? "New Customer" : query.data?.name,
      url: isNew ? "" : `/app/customers/${id}`,
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
          {isNew ? "Create Customer" : `Edit: ${query.data?.name ?? ""}`}
        </h1>
      </div>

      <Card className="bg-white rounded-lg shadow">
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={query.data || initialValues}
            validationSchema={CustomerSchema}
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
            }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <div className="space-y-4">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Customer name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.name && errors.name && (
                      <p className="text-sm text-w300 mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="Email address"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.email && (
                      <p className="text-sm text-w300 mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="phone_number">Phone Number</Label>
                    <Input
                      id="phone_number"
                      name="phone_number"
                      placeholder="Phone number"
                      value={values.phone_number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.phone_number && errors.phone_number && (
                      <p className="text-sm text-w300 mt-1">
                        {errors.phone_number}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                  />
                  {touched.description && errors.description && (
                    <p className="text-sm text-w300 mt-1">
                      {errors.description}
                    </p>
                  )}
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
                      ? "Create Customer"
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
