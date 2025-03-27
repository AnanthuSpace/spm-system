import React from "react";
import { Pencil } from "lucide-react"; // Importing the edit icon

const ProfileDetails = ({ user, onEdit }) => {
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
            <span className="text-blue-600">Name:</span> {user.fullName}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600">Phone:</span> {user.phone}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600">Email:</span> {user.email}
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600">Skills:</span> {user.skills}
          </p>
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-600">Qualification:</span> {user.qualification}
          </p>
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
    </div>
  );
};

export default ProfileDetails;
