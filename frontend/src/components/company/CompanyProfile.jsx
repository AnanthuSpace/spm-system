import React, { useState, useEffect } from "react";
import { getCompanyProfileApi } from "../../api/comapnyApi";
import EditCompanyProfile from "./EditCompanyProfile";
import { Pencil } from "lucide-react";
const CompanyProfile = () => {
  const [company, setCompany] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      const result = await getCompanyProfileApi();
      if (result && result.status === 200) {
        setCompany(result.data);
      }
    };
    fetchCompany();
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  if (!company) {
    return <p className="text-center text-gray-500">Loading company data...</p>;
  }

  return (
    <div className="p-6 relative">
      {isEditing ? (
        <EditCompanyProfile
          onClose={handleClose}
          onSave={handleSave}
          company={company}
        />
      ) : (
        <>
          <button
            onClick={handleEdit}
            className="absolute top-4 right-4 text-gray-600 hover:text-blue-600 transition-all"
          >
            <Pencil className="w-5 h-5 text-blue-600" />
          </button>

          <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <p className="text-lg font-semibold text-gray-800">
                <span className="text-blue-600">Company Name:</span>{" "}
                {company.companyName}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                <span className="text-blue-600">Phone:</span> {company.phone}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                <span className="text-blue-600">Email:</span> {company.email}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                <span className="text-blue-600">Address:</span>{" "}
                {company.address}
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-lg font-semibold text-gray-800">
                <span className="text-blue-600">Founded Year:</span>{" "}
                {company.foundedYear}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                <span className="text-blue-600">Industry:</span>{" "}
                {company.industry}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                <span className="text-blue-600">Company Size:</span>{" "}
                {company.companySize}
              </p>
              <p className="text-lg font-semibold text-gray-800">
                <span className="text-blue-600">Type:</span> {company.type}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">Description</h2>
            <p className="text-gray-700">
              {company.description || "No description available."}
            </p>
          </div>

          <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800">Website</h2>
            {company.website ? (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline transition-all"
              >
                Visit Website
              </a>
            ) : (
              <p className="text-red-500 font-medium">No Website Provided</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyProfile;
