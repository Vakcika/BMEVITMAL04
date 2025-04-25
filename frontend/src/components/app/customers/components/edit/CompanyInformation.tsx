import { FormInput } from "@/components/common/form/FormInput";
import { FormSelect } from "@/components/common/form/FormSelect";
import { FormikProps } from "formik";

interface CompanyInformationProps {
  formik: FormikProps<Customer>;
  users: User[];
  statuses: CustomerStatus[];
}

export default function CompanyInformation({
  formik,
  users,
  statuses,
}: Readonly<CompanyInformationProps>) {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    formik;

  return (
    <div className="space-y-4 md:col-span-2">
      <h3 className="text-lg font-medium">Company Information</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormInput
          id="company_name"
          name="company_name"
          label="Company Name*"
          placeholder="Company name"
          value={values.company_name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.company_name && errors.company_name
              ? errors.company_name
              : undefined
          }
        />

        <div className="flex justify-start gap-4">
          <FormSelect
            name="user"
            label="Assignee*"
            value={values.user?.id?.toString() ?? ""}
            onChange={(value) =>
              setFieldValue("user", {
                id: Number(value),
                name: users.find((u) => u.id === Number(value))?.name ?? "",
              })
            }
            options={users}
            getOptionValue={(u) => u.id.toString()}
            getOptionLabel={(u) => u.name}
            placeholder="Select assignee"
            emptyLabel="None"
            error={
              touched.user && errors.user ? "Assignee is required" : undefined
            }
          />

          <FormSelect
            name="status"
            label="Status*"
            value={values.status?.id?.toString() ?? ""}
            onChange={(value) => setFieldValue("status", { id: Number(value) })}
            options={statuses}
            getOptionValue={(s) => s.id.toString()}
            getOptionLabel={(s) => s.name}
            placeholder="Select status"
            emptyLabel="None"
            error={
              touched.status && errors.status ? "Status is required" : undefined
            }
          />
        </div>

        <FormInput
          id="website"
          name="website"
          label="Website"
          placeholder="https://example.com"
          value={values.website ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.website && errors.website ? errors.website : undefined}
        />

        <FormInput
          id="tax_number"
          name="tax_number"
          label="Tax Number"
          placeholder="Tax ID/Number"
          value={values.tax_number ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.tax_number && errors.tax_number
              ? errors.tax_number
              : undefined
          }
        />
      </div>
    </div>
  );
}
