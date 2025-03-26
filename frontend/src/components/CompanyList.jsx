import React from "react";

const companies = [
  { name: "Google", jobs: 120 },
  { name: "Microsoft", jobs: 90 },
  { name: "Amazon", jobs: 150 },
  { name: "Meta", jobs: 80 },
  { name: "Netflix", jobs: 50 },
  { name: "Apple", jobs: 110 },
];

const CompanyList = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center py-16">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Top Hiring Companies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 w-full max-w-7xl px-6">
        {companies.map((company, index) => (
          <div
            key={index}
            className="bg-white shadow-lg p-8 rounded-xl text-center transform transition-all duration-300 hover:scale-105"
          >
            <h3 className="text-2xl font-semibold text-gray-700">{company.name}</h3>
            <p className="text-blue-600 font-medium text-lg mt-2">{company.jobs} Openings</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
