import React from "react";
import { Briefcase, Globe, Users, GraduationCap } from "lucide-react";

const jobCategories = [
  { name: "Remote Jobs", icon: <Globe size={24} className="text-blue-600" /> },
  { name: "Freelance", icon: <Users size={24} className="text-green-600" /> },
  { name: "Full-Time", icon: <Briefcase size={24} className="text-indigo-600" /> },
  { name: "Internships", icon: <GraduationCap size={24} className="text-purple-600" /> },
];

const CategoriesSection = () => {
  return (
    <div className="py-16 bg-gray-50">
      <h2 className="text-center text-4xl font-bold text-gray-800">Explore Job Categories</h2>
      <p className="text-center text-gray-600 mt-3">Find the perfect job that matches your skills and interests.</p>

      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {jobCategories.map((category) => (
          <div
            key={category.name}
            className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 px-8 py-6 flex flex-col items-center rounded-xl w-56 cursor-pointer transform hover:scale-105"
          >
            {category.icon}
            <p className="mt-3 text-lg font-semibold text-gray-800">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
