import React from "react";
import { X } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { editUserApi } from "../../api/studentsApi";
import { toast } from "sonner";

const EditProfileModal = ({ user, onUpdate, onClose }) => {
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
      .required("Phone is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    qualification: Yup.string().required("Qualification is required"),
    university: Yup.string().required("University is required"),
    graduationYear: Yup.string()
      .matches(/^(19|20)\d{2}$/, "Enter a valid graduation year")
      .required("Graduation year is required"),
    cgpa: Yup.string()
      .matches(/^\d+(\.\d+)?$/, "Enter a valid CGPA/Percentage")
      .required("CGPA/Percentage is required"),
    skills: Yup.string().required("At least one skill is required"),
    resume: Yup.mixed().required("Resume is required"),
    certificates: Yup.mixed().required("Certificate is required"),
  });

  const initialValues = {
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    city: user?.city || "",
    state: user?.state || "",
    qualification: user?.qualification || "",
    university: user?.university || "",
    graduationYear: user?.graduationYear || "",
    cgpa: user?.cgpa || "",
    skills: Array.isArray(user?.skills)
      ? user.skills.join(", ")
      : user?.skills || "",
    resume: null,
    certificates: null,
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-80 backdrop-blur-lg z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[80vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold text-center text-blue-600 mb-4">
          Edit Profile
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const updatedUser = await editUserApi(values);
              if (updatedUser.success) {
                toast.success(updatedUser.message)
                onUpdate(updatedUser);
                onClose();
              }
            } catch (error) {
              toast.error("Error updating profile:", error);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="grid grid-cols-2 gap-4">
              {Object.keys(initialValues).map((key) => (
                <div
                  key={key}
                  className={
                    key === "skills" ||
                    key === "resume" ||
                    key === "certificates"
                      ? "col-span-2"
                      : ""
                  }
                >
                  <label className="block text-gray-700">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  {key === "resume" || key === "certificates" ? (
                    <input
                      type="file"
                      name={key}
                      accept=".pdf, .jpg, .jpeg, .png"
                      onChange={(event) =>
                        setFieldValue(key, event.currentTarget.files[0])
                      }
                      className="w-full p-2 border rounded-lg outline-none"
                    />
                  ) : (
                    <Field
                      type="text"
                      name={key}
                      placeholder={`Enter ${key
                        .replace(/([A-Z])/g, " $1")
                        .trim()}`}
                      className="w-full p-2 border rounded-lg outline-none"
                    />
                  )}
                  <ErrorMessage
                    name={key}
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
              ))}
              <div className="col-span-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProfileModal;
