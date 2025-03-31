import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAppliedJobsApi } from "../../api/studentsApi";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await getAppliedJobsApi();
        if (response.success) {
          setAppliedJobs(response.appliedJobs);
        } else {
          toast.error("Failed to fetch applied jobs.");
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
        toast.error("Something went wrong!");
      }
    };

    fetchAppliedJobs();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center py-16">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          My Applied Jobs
        </h1>

        {appliedJobs.length === 0 ? (
          <p className="text-gray-600">You haven't applied for any jobs yet.</p>
        ) : (
          <ul className="space-y-4">
            {appliedJobs.map((job) => (
              <li
                key={job._id}
                className="p-4 bg-gray-100 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {job.title}
                  </h2>
                  <p className="text-gray-600">
                    {job.company} • {job.location} • {job.employmentType}
                  </p>
                  <p className="text-blue-600 font-semibold">{job.salary}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
