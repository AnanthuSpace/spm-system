import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginCompany } from "../../api/comapnyApi";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const CompanyLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await loginCompany(values);
      console.log(response);
      if (response.success) {
        localStorage.setItem("companyToken", response.data.accessToken);
        toast.success(response.message);
        navigate("/company");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Company Login
        </h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-500" />
                <Field
                  type="email"
                  name="email"
                  placeholder="Company Email"
                  className="w-full p-3 pl-10 outline-none bg-gray-100 rounded-lg"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-500" />
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 pl-10 outline-none bg-gray-100 rounded-lg"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/company-signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CompanyLogin;
