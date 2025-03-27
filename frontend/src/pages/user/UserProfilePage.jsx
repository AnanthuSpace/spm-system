import React, { useState } from "react";
import EditProfileModal from "../../components/user/EditProfileModal";
import ProfileDetails from "../../components/user/ProfileDetails";
import { User } from "lucide-react";

const UserProfilePage = () => {
  const [user, setUser] = useState({
    fullName: "John Doe",
    phone: "9876543210",
    email: "johndoe@example.com",
    skills: "React, Node.js, MongoDB",
    qualification: "B.Tech in Computer Science",
    resume: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdate = (updatedUser) => {
    setUser(updatedUser);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full overflow-hidden">
        {/* Header with Gray Background */}
        <div className="bg-gray-300 h-40 flex justify-center items-center relative">
          <div className="absolute -bottom-12 w-24 h-24 bg-gray-400 rounded-full flex justify-center items-center">
            <User className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Profile Content */}
        <div className="mt-16 p-6">
          <ProfileDetails user={user} onEdit={() => setIsModalOpen(true)} />
        </div>

        {isModalOpen && (
          <EditProfileModal
            user={user}
            onUpdate={handleUpdate}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
