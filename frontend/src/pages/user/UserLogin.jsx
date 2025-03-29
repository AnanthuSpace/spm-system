import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { loginUser } from "../../api/studentsApi";
import { Link, useNavigate } from "react-router-dom";
import AuthImg from "../../components/user/AuthImg";

const UserLogin = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await loginUser(values);
        if (response?.success) {

          localStorage.setItem("userId", response.data.userData._id);
          localStorage.setItem("accessToken", response.data.accessToken);

          toast.success("Login successful!");
          resetForm();
          navigate("/");
        }
      } catch (error) {
        console.error("Login Error:", error);
        toast.error(error.message || "Invalid email or password.");
      }
    },
  });

  return (
    <div className="flex h-screen w-screen">
      {/* Left Side - Fullscreen Image */}
      <AuthImg />

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100 p-8">
        <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
            Login
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
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

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all"
            >
              Login
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
