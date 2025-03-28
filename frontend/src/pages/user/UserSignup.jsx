import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { registerUser } from "../../../api/studentsApi";
import { Link, useNavigate } from "react-router-dom";
import AuthImg from "../../components/user/AuthImg";

const UserSignup = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Must be at least 3 characters")
        .required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await registerUser(values);
        if (response?.success) {
          toast.success(response.message);
          resetForm();
          navigate("/otp-verify", { state: { email: values.email } });
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.message || "Registration failed. Please try again.");
      }
    },
  });

  return (
    <div className="flex h-screen w-screen">
      <AuthImg />

      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100 p-8">
        <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
            Signup
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <input
                type="text"
                name="name"
                {...formik.getFieldProps("name")}
                className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Full Name"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                {...formik.getFieldProps("email")}
                className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Email"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                {...formik.getFieldProps("password")}
                className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Password"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <input
                type="password"
                name="confirmPassword"
                {...formik.getFieldProps("confirmPassword")}
                className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Confirm Password"
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
