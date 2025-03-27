import React from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    companyName: "Tech Solutions Pvt Ltd",
    location: "Remote",
    type: "Full-time",
  },
  {
    id: 2,
    title: "React.js Developer",
    companyName: "Tech Solutions Pvt Ltd",
    location: "Bangalore, India",
    type: "Contract",
  },
  {
    id: 3,
    title: "Backend Engineer",
    companyName: "Tech Solutions Pvt Ltd",
    location: "New York, USA",
    type: "Full-time",
  },
  {
    id: 4,
    title: "Full Stack Developer",
    companyName: "Tech Solutions Pvt Ltd",
    location: "San Francisco, USA",
    type: "Part-time",
  },
];

const Jobs = () => {
  return (
    <div className="mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Your Job Listings</h1>
        <Link
          to="/create-job"
          className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Job
        </Link>
      </div>

      {/* Job List */}
      {jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border p-4 rounded-md shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.companyName}</p>
              <div className="flex justify-between text-gray-500 text-sm mt-2">
                <span>{job.location}</span>
                <span>{job.type}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No jobs posted yet.</p>
      )}
    </div>
  );
};

export default Jobs;
