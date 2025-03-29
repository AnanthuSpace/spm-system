import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MapPin, Briefcase, Phone, Globe, Users, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { registerCompany } from "../../api/comapnyApi";

const validationSchema = Yup.object({
  address: Yup.string().required("Address is required"),
  industry: Yup.string().required("Industry is required"),
  description: Yup.string().required("Description is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Invalid phone number")
    .required("Phone number is required"),
  website: Yup.string()
    .url("Invalid website URL")
    .required("Website is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  companySize: Yup.string().required("Company size is required"),
  foundedYear: Yup.number()
    .min(1800, "Enter a valid year")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .required("Founded year is required"),
  type: Yup.string().required("Company type is required"),
});

const CompanyRegistration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const companyData = location.state?.companyData || {};

  const handleSubmit = async (values) => {
    try {
      const finalData = { ...companyData, ...values };
      const response = await registerCompany(finalData);
      if (response) {
        console.log("Final Company Data:", finalData);
        toast.success(response.message);
        toast.success("Successfully registered! Please wait for approval.");
        navigate("/company-login");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Company Details
        </h2>
        <Formik
          initialValues={{
            address: "",
            industry: "",
            description: "",
            phone: "",
            website: "",
            city: "",
            state: "",
            companySize: "",
            foundedYear: "",
            type: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="grid grid-cols-2 gap-6">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-500" />
                <Field
                  type="text"
                  name="address"
                  placeholder="Company Address"
                  className="w-full p-3 pl-10 outline-none bg-gray-100 rounded-lg"
                />
                <ErrorMessage
                  name="address"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="relative">
                <Briefcase className="absolute left-3 top-3 text-gray-500" />
                <Field
                  type="text"
                  name="industry"
                  placeholder="Industry"
                  className="w-full p-3 pl-10 outline-none bg-gray-100 rounded-lg"
                />
                <ErrorMessage
                  name="industry"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="relative col-span-2">
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Company Description"
                  className="w-full p-3 outline-none bg-gray-100 rounded-lg h-24"
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gray-500" />
                <Field
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full p-3 pl-10 outline-none bg-gray-100 rounded-lg"
                />
                <ErrorMessage
                  name="phone"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="relative">
                <Globe className="absolute left-3 top-3 text-gray-500" />
                <Field
                  type="text"
                  name="website"
                  placeholder="Company Website"
                  className="w-full p-3 pl-10 outline-none bg-gray-100 rounded-lg"
                />
                <ErrorMessage
                  name="website"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="relative">
                <Field
                  type="text"
                  name="city"
                  placeholder="City"
                  className="w-full p-3 outline-none bg-gray-100 rounded-lg"
                />
                <ErrorMessage
                  name="city"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="relative">
                <Field
                  type="text"
                  name="state"
                  placeholder="State"
                  className="w-full p-3 outline-none bg-gray-100 rounded-lg"
                />
                <ErrorMessage
                  name="state"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="relative">
                <Users className="absolute left-3 top-3 text-gray-500" />
                <Field
                  as="select"
                  name="companySize"
                  className="w-full p-3 pl-10 outline-none bg-gray-100 rounded-lg"
                >
                  <option value="">Select Company Size</option>
                  <option value="1-10">1-10 Employees</option>
                  <option value="11-50">11-50 Employees</option>
                  <option value="51-200">51-200 Employees</option>
                  <option value="201-500">201-500 Employees</option>
                  <option value="501+">501+ Employees</option>
                </Field>
                <ErrorMessage
                  name="companySize"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-500" />
                <Field
                  type="number"
                  name="foundedYear"
                  placeholder="Founded Year"
                  className="w-full p-3 pl-10 outline-none bg-gray-100 rounded-lg"
                />
                <ErrorMessage
                  name="foundedYear"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="relative">
                <Field
                  as="select"
                  name="type"
                  className="w-full p-3 outline-none bg-gray-100 rounded-lg"
                >
                  <option value="">Select Company Type</option>
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                  <option value="NGO">NGO</option>
                  <option value="Startup">Startup</option>
                </Field>
                <ErrorMessage
                  name="type"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CompanyRegistration;
