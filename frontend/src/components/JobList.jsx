import React from "react";

const jobs = [
  {
    title: "Frontend Developer",
    company: "Google",
    location: "Remote",
    type: "Full-Time",
    salary: "$120k - $140k",
  },
  {
    title: "Backend Engineer",
    company: "Amazon",
    location: "San Francisco, CA",
    type: "Full-Time",
    salary: "$130k - $150k",
  },
  {
    title: "UI/UX Designer",
    company: "Meta",
    location: "New York, NY",
    type: "Part-Time",
    salary: "$70k - $90k",
  },
  {
    title: "Software Engineer",
    company: "Microsoft",
    location: "Seattle, WA",
    type: "Full-Time",
    salary: "$125k - $145k",
  },
  {
    title: "DevOps Engineer",
    company: "Netflix",
    location: "Los Angeles, CA",
    type: "Contract",
    salary: "$100k - $130k",
  },
  {
    title: "Full Stack Developer",
    company: "Apple",
    location: "Austin, TX",
    type: "Full-Time",
    salary: "$135k - $155k",
  },
];

const JobList = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-16">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">
        Latest Job Openings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-6">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white shadow-lg p-6 rounded-xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            <h3 className="text-2xl font-semibold text-gray-700">
              {job.title}
            </h3>
            <p className="text-gray-500 mt-1">{job.company}</p>
            <p className="text-sm text-gray-600 mt-2">
              {job.location} • {job.type}
            </p>
            <p className="text-lg font-semibold text-blue-600 mt-4">
              {job.salary}
            </p>
            <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
