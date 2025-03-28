import React from "react";
import { Pencil } from "lucide-react"; // Importing the edit icon

const ProfileDetails = ({ user = {}, onEdit }) => {
  return (
    <div className="p-6 relative">
      {/* Edit Icon Button (Top Right) */}
      <button
        onClick={onEdit}
        className="absolute top-4 right-4 text-gray-600 hover:text-blue-600 transition-all"
      >
        <Pencil className="w-6 h-6" />
      </button>

      {/* User Details Grid */}
      <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600">Full Name:</span> {user.fullName || "N/A"}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600">Personal Email:</span> {user.email || "N/A"}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600">Phone:</span> {user.phone || "N/A"}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600">City & State:</span> {user.cityState || "N/A"}
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600">Highest Qualification:</span> {user.highestQualification || "N/A"}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600">University:</span> {user.university || "N/A"}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600">Graduation Year:</span> {user.graduationYear || "N/A"}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600">CGPA/Percentage:</span> {user.cgpaOrPercentage || "N/A"}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600">Skills:</span>{" "}
            {Array.isArray(user.skills) && user.skills.length > 0 ? user.skills.join(", ") : "N/A"}
          </p>
        </div>
      </div>

      {/* Uploaded Files */}
      <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-md">
        <p className="text-lg font-semibold text-gray-800">Uploaded Documents:</p>
        <div className="mt-4 space-y-2">
          {/* Resume */}
          {user.resume ? (
            <a
              href={user.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline transition-all block"
            >
              📄 View Resume
            </a>
          ) : (
            <p className="text-red-500 font-medium">No Resume Uploaded</p>
          )}

          {/* Certificates */}
          {Array.isArray(user.certificates) && user.certificates.length > 0 ? (
            <div>
              <p className="text-gray-800 font-semibold">Certificates:</p>
              {user.certificates.map((certificate, index) => (
                <a
                  key={index}
                  href={certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline transition-all block"
                >
                  📜 Certificate {index + 1}
                </a>
              ))}
            </div>
          ) : (
            <p className="text-red-500 font-medium">No Certificates Uploaded</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
