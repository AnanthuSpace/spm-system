import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Mail, Lock, Building } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  companyName: Yup.string().required("Company Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const CompanySignup = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log("Signup Data:", values);
    navigate("/company-registration", { state: { companyData: values } });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Company Signup
        </h2>
        <Formik
          initialValues={{
            companyName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div className="relative">
                <Building className="absolute left-3 top-3 text-gray-500" />
                <Field
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  className="w-full p-3 pl-10 outline-none bg-gray-100 rounded-lg"
                />
                <ErrorMessage
                  name="companyName"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

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

              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-500" />
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full p-3 pl-10 outline-none bg-gray-100 rounded-lg"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/company-login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CompanySignup;
