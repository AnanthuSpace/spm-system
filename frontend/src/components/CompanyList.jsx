import React, { useEffect, useState } from "react";
import { fetchCompaniesApi } from "../api/studentsApi";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    try {
      const response = await fetchCompaniesApi();
      if (response.success) {
        console.log(response.company[0]);
        setCompanies(response.company);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-16">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">
        Top Hiring Companies
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 w-full max-w-7xl px-6">
        {companies.map((company, index) => (
          <div
            key={index}
            className="bg-white shadow-lg p-6 rounded-xl transform transition-all duration-300 hover:scale-105 border border-gray-200"
          >
            {/* Company Name */}
            <h3 className="text-2xl font-semibold text-gray-700 ">
              {company.companyName}
            </h3>

            {/* Industry & Founded Year */}
            <p className="text-gray-500 text-sm mt-1">
              <span className="font-medium text-gray-700">Industry:</span>{" "}
              {company.industry}
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-medium text-gray-700">Founded:</span>{" "}
              {company.foundedYear}
            </p>

            {/* Company Size */}
            <p className="text-gray-600 font-medium text-sm mt-1">
              Size: {company.companySize} employees
            </p>

            {/* Location */}
            <p className="text-gray-600 text-sm">
              {company.address}, {company.city}, {company.state}
            </p>

            {/* Website Link */}
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm font-medium hover:underline mt-2 block"
              >
                Visit Website
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
