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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@webbydevs/react-laravel-sanctum-auth";

const CustomerSchema = Yup.object().shape({
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

export default function EditCustomer({ isNew = false }) {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const initialValues: Customer = {
    id: 0,
    user: user,
    status: { id: 1, name: "" },
    company_name: "",
    name: "",
    email: "",
    phone_number: "",
    address: "",
    tax_number: "",
    website: "",
    description: "",
    created_at: "",
    updated_at: "",
  };

  const query = isNew
    ? {
        data: { data: initialValues },
        isLoading: false,
        error: null,
      }
    : useHttpGet<{ data: Customer }>(`/api/customers/${id}`);

  if (query.error) {
    toast.error(query.error.name || "Failed to load customer.");
    console.error(query.error);
  }

  const statusesQuery = useHttpGet<CustomerStatus[]>("/api/customer-statuses");

  if (statusesQuery.error) {
    toast.error(statusesQuery.error.name || "Failed to load status.");
    console.error(statusesQuery.error);
  }

  const usersQuery = useHttpGet<User[]>("/api/users");

  if (usersQuery.error) {
    toast.error(usersQuery.error.name || "Failed to load users.");
    console.error(usersQuery.error);
  }

  const updateMutation = useHttpPut("/api/customers");
  const createMutation = useHttpPost("/api/customers");

  const handleSubmit = async (values: Customer) => {
    let newValues: Partial<Customer & { user_id: number; status_id: number }> =
      { ...values };

    newValues["user_id"] = values.user?.id;
    newValues["status_id"] = values.status.id;

    delete newValues["status"];
    delete newValues["user"];

    try {
      if (!isNew) {
        await updateMutation.mutateAsync(newValues);
        toast.success("Customer updated successfully");
        navigate(`/app/customers/${id}`);
      } else {
        const { data } = await createMutation.mutateAsync(newValues);
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
      label: isNew ? "New Customer" : query.data?.data.company_name,
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
          {isNew
            ? "Create Customer"
            : `Edit: ${query.data?.data.company_name ?? ""}`}
        </h1>
      </div>

      <Card className="bg-white rounded-lg shadow">
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={(!isNew && query.data?.data) || initialValues}
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
              setFieldValue,
            }) => (
              <Form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4 md:col-span-2">
                    <h3 className="text-lg font-medium">Company Information</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="company_name">Company Name*</Label>
                        <Input
                          id="company_name"
                          name="company_name"
                          placeholder="Company name"
                          value={values.company_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.company_name && errors.company_name && (
                          <p className="text-sm text-w300 mt-1">
                            {errors.company_name}
                          </p>
                        )}
                      </div>
                      <div className="flex justify-start gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="user">Assignee*</Label>
                          <Select
                            name="user"
                            value={values.user?.id?.toString()}
                            onValueChange={(value) =>
                              setFieldValue("user", {
                                id: Number(value),
                                name:
                                  usersQuery.data?.find(
                                    (u) => u.id === Number(value)
                                  )?.name ?? "",
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select assignee" />
                            </SelectTrigger>
                            <SelectContent>
                              {usersQuery.data?.map((user) => (
                                <SelectItem
                                  key={user.id}
                                  value={user.id.toString()}
                                >
                                  {user.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {touched.user && errors.user && (
                            <p className="text-sm text-w300 mt-1">
                              {errors.user}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status">Status*</Label>
                          <Select
                            name="status"
                            value={values.status?.id.toString()}
                            onValueChange={(value) =>
                              setFieldValue("status", { id: Number(value) })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              {statusesQuery.data?.map((status) => (
                                <SelectItem
                                  key={status.id}
                                  value={status.id.toString()}
                                >
                                  {status.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {touched.status && errors.status && (
                            <p className="text-sm text-w300 mt-1">
                              {errors.status.name}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            name="website"
                            placeholder="https://example.com"
                            value={values.website ?? ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.website && errors.website && (
                            <p className="text-sm text-w300 mt-1">
                              {errors.website}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tax_number">Tax Number</Label>
                        <Input
                          id="tax_number"
                          name="tax_number"
                          placeholder="Tax ID/Number"
                          value={values.tax_number ?? ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.tax_number && errors.tax_number && (
                          <p className="text-sm text-w300 mt-1">
                            {errors.tax_number}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 md:col-span-2">
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Contact Name*</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Contact person's name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.name && errors.name && (
                          <p className="text-sm text-w300 mt-1">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email*</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Email address"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {touched.email && errors.email && (
                          <p className="text-sm text-w300 mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone_number">Phone Number</Label>
                        <Input
                          id="phone_number"
                          name="phone_number"
                          placeholder="Phone number"
                          value={values.phone_number ?? ""}
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
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      placeholder="Enter full address"
                      value={values.address ?? ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={3}
                    />
                    {touched.address && errors.address && (
                      <p className="text-sm text-w300 mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Additional notes or description"
                      value={values.description ?? ""}
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
