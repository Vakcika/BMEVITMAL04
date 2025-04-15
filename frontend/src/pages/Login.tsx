import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import LoginBrand from "@/components/common/LoginBrand";
import LazyImage from "@/components/common/LazyImg";
import { useLogin } from "@webbydevs/react-laravel-sanctum-auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const { login } = useLogin();
  const navigate = useNavigate();

  const handleLogin = async (credentials: object) => {
    try {
      const result = await login(credentials);

      if (result?.success) {
        toast.success("Login Successful");
        navigate("/app/dashboard");
      } else {
        toast.error("Invalid email or password. Please try again.");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ??
        error?.message ??
        "An error occurred while trying to login.";

      toast.error(errorMessage);
      console.error(error);
    }
  };
  return (
    <>
      <title>CRM Portal | Login</title>
      <link rel="canonical" href="/login"></link>
      <meta name="description" content="CRM Portal login page" />
      <div className="flex flex-col md:flex-row items-center justify-auto">
        <LazyImage
          src="/images/background_login.webp"
          alt="Login Background"
          className="w-full h-screen hidden md:block"
          width="w-full"
          height="h-screen"
        />
        <div className="flex flex-col w-full items-center justify-auto h-screen">
          <div className="w-full h-full max-w-sm p-4 flex flex-col justify-center">
            <div>
              <LoginBrand />
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .email("Invalid email address")
                    .required("Required"),
                  password: Yup.string().required("Required"),
                })}
                onSubmit={handleLogin}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  isSubmitting,
                }) => (
                  <Form className="my-16">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        {touched.email && errors.email && (
                          <p className="text-sm text-w300">{errors.email}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Enter password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        {touched.password && errors.password && (
                          <p className="text-sm text-w300">{errors.password}</p>
                        )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full mt-8"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
