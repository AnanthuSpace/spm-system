import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import AddJobModal from "./AddJobModal";
import { fetchJobApi } from "../../api/comapnyApi";

const initialJobs = [];

const Jobs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobList, setJobList] = useState(initialJobs);

  const fetchJobs = async () => {
    try {
      const result = await fetchJobApi();
      if (result.success) {
        setJobList(result.jobs);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [isModalOpen]);

  const handleAddJob = (newJob) => {
    const newJobWithId = {
      ...newJob,
      id:
        jobList.length > 0 ? Math.max(...jobList.map((job) => job.id)) + 1 : 1,
    };
    setJobList([...jobList, newJobWithId]);
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Your Job Listings</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        >
          <Plus size={18} />
          Create Job
        </button>
      </div>

      {jobList.length > 0 ? (
        <div className="space-y-4">
          {jobList.map((job) => (
            <div
              key={job._id}
              className="border p-4 rounded-md shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
              <div className="flex justify-between text-gray-500 text-sm mt-2">
                <span>{job.location}</span>
                <span>{job.employmentType}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-500 p-6">
          <p className="text-lg">No jobs posted yet.</p>
          <p className="text-sm">
            Click "Create Job" to add a new job listing.
          </p>
        </div>
      )}

      {isModalOpen && (
        <AddJobModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddJob}
        />
      )}
    </div>
  );
};

export default Jobs;
