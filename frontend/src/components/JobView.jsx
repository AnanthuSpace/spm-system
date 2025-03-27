import React from "react";

const jobDetails = {
  title: "Frontend Developer",
  company: "Google",
  location: "Remote",
  type: "Full-Time",
  salary: "$120k - $140k",
  description:
    "We are looking for a skilled Frontend Developer to join our team. You will be responsible for developing and implementing user interface components using React.js, ensuring high performance and responsiveness.",
  responsibilities: [
    "Develop and maintain user-facing features.",
    "Ensure the technical feasibility of UI/UX designs.",
    "Optimize applications for maximum speed and scalability.",
    "Collaborate with back-end developers and designers to improve usability.",
  ],
  requirements: [
    "Proven experience as a Frontend Developer.",
    "Strong knowledge of React.js, JavaScript, and CSS.",
    "Experience with responsive and adaptive design.",
    "Familiarity with RESTful APIs and version control systems like Git.",
  ],
};

const JobView = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center py-16">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800">{jobDetails.title}</h1>
        <p className="text-lg text-gray-600 mt-2">
          {jobDetails.company} • {jobDetails.location} • {jobDetails.type}
        </p>
        <p className="text-xl font-semibold text-blue-600 mt-4">
          {jobDetails.salary}
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Job Description
        </h2>
        <p className="text-gray-600 mt-2">{jobDetails.description}</p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Responsibilities
        </h2>
        <ul className="list-disc pl-6 mt-2 text-gray-600">
          {jobDetails.responsibilities.map((resp, index) => (
            <li key={index}>{resp}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Requirements
        </h2>
        <ul className="list-disc pl-6 mt-2 text-gray-600">
          {jobDetails.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>

        <button className="mt-8 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobView;
