import { FormInput } from "@/components/common/form/FormInput";
import { FormikProps } from "formik";

interface ContactInformationProps {
  formik: FormikProps<Customer>;
}

export default function ContactInformation({
  formik,
}: Readonly<ContactInformationProps>) {
  const { values, errors, touched, handleChange, handleBlur } = formik;

  return (
    <div className="space-y-4 md:col-span-2">
      <h3 className="text-lg font-medium">Contact Information</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormInput
          id="name"
          name="name"
          label="Contact Name*"
          placeholder="Contact person's name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && errors.name}
        />

        <FormInput
          id="email"
          name="email"
          label="Email*"
          type="email"
          placeholder="Email address"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email}
        />

        <FormInput
          id="phone_number"
          name="phone_number"
          label="Phone Number"
          placeholder="Phone number"
          value={values.phone_number ?? ""}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phone_number && errors.phone_number}
        />
      </div>
    </div>
  );
}
