import React from "react";
import { Pencil } from "lucide-react"; // Importing the edit icon

const ProfileDetails = () => {
  // Dummy user data (embedded in the component)
  const user = {
    fullName: "John Doe",
    email: "johndoe@gmail.com",
    phone: "+91 9876543210",
    cityState: "Bangalore, India",
    highestQualification: "Bachelor of Technology",
    university: "Indian Institute of Technology, Delhi",
    graduationYear: 2023,
    cgpaOrPercentage: "8.9 CGPA",
    skills: ["React", "Node.js", "MongoDB", "Express.js"],
    certificates: [
      "https://example.com/certificate1.pdf",
      "https://example.com/certificate2.jpg"
    ],
    resume: "https://example.com/johndoe_resume.pdf"
  };

  // Handle Edit Button Click
  const handleEdit = () => {
    alert("Edit Profile Clicked!");
  };

  return (
    <div className="p-6 relative">
      {/* Edit Icon Button (Top Right) */}
      <button
        onClick={handleEdit}
        className="absolute top-4 right-4 text-gray-600 hover:text-blue-600 transition-all"
      >
        <Pencil className="w-6 h-6" />
      </button>

      {/* User Details Grid */}
      <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600">Name:</span> {user.fullName}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600">Phone:</span> {user.phone}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600">Email:</span> {user.email}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600">City & State:</span> {user.cityState}
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600">Qualification:</span> {user.highestQualification}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600">University:</span> {user.university}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600">Graduation Year:</span> {user.graduationYear}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600">CGPA/Percentage:</span> {user.cgpaOrPercentage}
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
        <p className="text-gray-700">
          {user.skills && user.skills.length > 0 ? user.skills.join(", ") : "No skills added"}
        </p>
      </div>

      {/* Certificates */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">Certificates</h2>
        {user.certificates && user.certificates.length > 0 ? (
          <ul className="list-disc list-inside text-blue-600">
            {user.certificates.map((cert, index) => (
              <li key={index}>
                <a href={cert} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  📜 Certificate {index + 1}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No certificates uploaded</p>
        )}
      </div>

      {/* Resume */}
      <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">Resume</h2>
        {user.resume ? (
          <a
            href={user.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline transition-all"
          >
            📄 View Resume
          </a>
        ) : (
          <p className="text-red-500 font-medium">No Resume Uploaded</p>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
