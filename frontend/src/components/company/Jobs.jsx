import React, { useState } from "react";
import { Plus } from "lucide-react";
import AddJobModal from "./AddJobModal";

const initialJobs = [
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobList, setJobList] = useState(initialJobs);

  const handleAddJob = (newJob) => {
    const newJobWithId = {
      ...newJob,
      id: jobList.length > 0 ? Math.max(...jobList.map((job) => job.id)) + 1 : 1,
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

      {isModalOpen && (
        <AddJobModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddJob}
          companyName="Tech Solutions Pvt Ltd"
        />
      )}
    </div>
  );
};

export default Jobs;
