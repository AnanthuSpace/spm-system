import React, { useEffect, useState } from "react";
import EditProfileModal from "../../components/user/EditProfileModal";
import ProfileDetails from "../../components/user/ProfileDetails";
import { User } from "lucide-react";
import { fetchUserDataApi } from "../../../api/studentsApi";

const UserProfilePage = () => {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const userData = await fetchUserDataApi();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUser();
  }, [isModalOpen]);

  console.log(user)

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isModalOpen]);

  const handleUpdate = (updatedUser) => {
    setUser(updatedUser);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full overflow-hidden">
        <div className="bg-gray-300 h-40 flex justify-center items-center relative">
          <div className="absolute -bottom-12 w-24 h-24 bg-gray-400 rounded-full flex justify-center items-center">
            <User className="w-12 h-12 text-white" />
          </div>
        </div>

        <div className="mt-16 p-6">
          {user ? (
            <ProfileDetails user={user} onEdit={() => setIsModalOpen(true)} />
          ) : (
            <p className="text-center text-gray-500">Loading profile...</p>
          )}
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
