import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
// import { verifyOtp } from "../../../api/studentsApi";
import { useNavigate } from "react-router-dom";

const UserOtp = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
        .required("OTP is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await verifyOtp(values);
        if (response?.success) {
          toast.success("OTP verified successfully!");
          resetForm();
          navigate("/dashboard"); // Redirect after verification
        }
      } catch (error) {
        console.error("OTP Error:", error);
        toast.error(error.message || "Invalid OTP. Please try again.");
      }
    },
  });

  return (
    <div className="flex h-screen w-screen">
      {/* Left Side - Fullscreen Image */}
      <div className="hidden md:flex w-1/2 h-full">
        <img
          src="/otp.jpg"
          alt="OTP Verification"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - OTP Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100 p-8">
        <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
            OTP Verification
          </h2>
          <p className="text-sm text-gray-600 text-center mb-4">
            Enter the 6-digit OTP sent to your email
          </p>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* OTP Input */}
            <div>
              <input
                type="text"
                name="otp"
                {...formik.getFieldProps("otp")}
                className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 text-center tracking-widest"
                placeholder="Enter OTP"
                maxLength={6}
              />
              {formik.touched.otp && formik.errors.otp && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.otp}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all"
            >
              Verify OTP
            </button>
          </form>

          {/* Resend OTP Link */}
          <p className="text-sm text-center mt-4">
            Didn't receive OTP?{" "}
            <button
              onClick={() => toast.info("Resending OTP...")}
              className="text-blue-600 hover:underline"
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserOtp;
