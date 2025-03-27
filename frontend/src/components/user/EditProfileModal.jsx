import React, { useState } from "react";
import { X } from "lucide-react";

const EditProfileModal = ({ user, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    email: user?.email || "",
    skills: Array.isArray(user?.skills) ? user.skills.join(", ") : user?.skills || "",
    qualification: user?.qualification || "",
    resume: user?.resume || "",
  });

  const [resumeFile, setResumeFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResumeUpload = (e) => {
    if (e.target.files?.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = { ...formData };

    if (resumeFile) {
      const resumeURL = URL.createObjectURL(resumeFile);    
      updatedData.resume = resumeURL;
    }

    onUpdate(updatedData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-80 backdrop-blur-lg z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-red-600">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-center text-blue-600 mb-4">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
              className="w-full p-2 border rounded-lg outline-none" />
          </div>

          <div>
            <label className="block text-gray-700">Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange}
              className="w-full p-2 border rounded-lg outline-none" />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Email</label>
            <input type="email" name="email" value={formData.email} disabled
              className="w-full p-2 border rounded-lg outline-none bg-gray-100" />
          </div>

          <div>
            <label className="block text-gray-700">Skills</label>
            <input type="text" name="skills" value={formData.skills} onChange={handleChange}
              className="w-full p-2 border rounded-lg outline-none" />
            <p className="text-sm text-gray-500">Separate skills with commas.</p>
          </div>

          <div>
            <label className="block text-gray-700">Qualification</label>
            <input type="text" name="qualification" value={formData.qualification} onChange={handleChange}
              className="w-full p-2 border rounded-lg outline-none" />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Resume (PDF)</label>
            <input type="file" accept="application/pdf" onChange={handleResumeUpload}
              className="w-full p-2 border rounded-lg outline-none" />
            {formData.resume && (
              <a href={formData.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                📄 View Current Resume
              </a>
            )}
          </div>

          <div className="col-span-2 flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
