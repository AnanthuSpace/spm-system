import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import { applyApi } from "../api/studentsApi";

const JobView = () => {
  const location = useLocation();
  const job = location.state?.job || {};

  const [jobDetails, setJobDetails] = useState(job);
  const userId = localStorage.getItem("userId");

  const hasApplied = jobDetails.applicants?.includes(userId); 

  const handleApply = async () => {
    try {
      const response = await applyApi(jobDetails._id);
      if (response.success) {
        setJobDetails(response.appliedJob);
        toast.success(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center py-16">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800">{jobDetails.title}</h1>
        <p className="text-lg text-gray-600 mt-2">
          {jobDetails.company} • {jobDetails.location} •{" "}
          {jobDetails.employmentType}
        </p>
        <p className="text-xl font-semibold text-blue-600 mt-4">
          {jobDetails.salary}
        </p>

        {jobDetails.applicants ? (
          <p className="text-md font-medium text-gray-700 mt-2">
            {jobDetails.applicants.length} candidates have applied.
          </p>
        ) : (
          <p className="text-md font-medium text-gray-700 mt-2">
            No applications yet.
          </p>
        )}

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Job Description
        </h2>
        <p className="text-gray-600 mt-2">{jobDetails.about}</p>

        {jobDetails.responsibilities &&
          jobDetails.responsibilities.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mt-6">
                Responsibilities
              </h2>
              <ul className="list-disc pl-6 mt-2 text-gray-600">
                {jobDetails.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </>
          )}

        {jobDetails.requirements && jobDetails.requirements.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mt-6">
              Requirements
            </h2>
            <ul className="list-disc pl-6 mt-2 text-gray-600">
              {jobDetails.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </>
        )}

        <button
          className={`mt-8 py-3 px-6 rounded-lg transition ${
            hasApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          onClick={handleApply}
          disabled={hasApplied} // Disable button if already applied
        >
          {hasApplied ? "Already Applied" : "Apply Now"}
        </button>
      </div>
    </div>
  );
};

export default JobView;
