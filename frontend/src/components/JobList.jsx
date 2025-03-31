import React, { useEffect, useState } from "react";
import { fetchJobsApi } from "../api/studentsApi";
import { useNavigate } from "react-router-dom";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const response = await fetchJobsApi();
      if (response.success) {
        setJobs(response.jobs);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-16">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">
        Latest Job Openings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-lg p-6 rounded-xl flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-gray-200"
            >
              {/* Job Title */}
              <h3 className="text-2xl font-semibold text-gray-700">
                {job.title}
              </h3>

              {/* Company Name */}
              <p className="text-gray-500 mt-1">{job.company}</p>

              <p className="text-sm text-gray-600 mt-2">
                {job.location} • {job.employmentType}
              </p>

              <p className="text-lg font-semibold text-blue-600 mt-4">
                {job.salary}
              </p>

              {/* Apply Button */}
              <button
                className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                onClick={() => navigate("/job-details", { state: { job } })}
              >
                Apply Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No job listings available.</p>
        )}
      </div>
    </div>
  );
};

export default JobList;
