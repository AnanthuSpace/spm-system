import React, { useState } from "react";
import { X } from "lucide-react";

const EditProfileModal = ({ user, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "Ananthu",
    phone: user?.phone || "N/A",
    city: user?.city || "N/A",
    state: user?.state || "N/A",
    qualification: user?.qualification || "N/A",
    university: user?.university || "N/A",
    graduationYear: user?.graduationYear || "N/A",
    cgpa: user?.cgpa || "N/A",
    skills: Array.isArray(user?.skills) ? user.skills.join(", ") : user?.skills || "N/A",
    resume: user?.resume || "",
    certificates: user?.certificates || [],
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [certificateFiles, setCertificateFiles] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResumeUpload = (e) => {
    if (e.target.files?.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleCertificateUpload = (e) => {
    if (e.target.files?.length > 0) {
      const files = Array.from(e.target.files);
      setCertificateFiles([...certificateFiles, ...files]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = { ...formData };

    if (resumeFile) {
      const resumeURL = URL.createObjectURL(resumeFile);
      updatedData.resume = resumeURL;
    }

    if (certificateFiles.length > 0) {
      const certificateURLs = certificateFiles.map((file) => URL.createObjectURL(file));
      updatedData.certificates = [...updatedData.certificates, ...certificateURLs];
    }

    onUpdate(updatedData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-80 backdrop-blur-lg z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative">
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

          <div>
            <label className="block text-gray-700">City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange}
              className="w-full p-2 border rounded-lg outline-none" />
          </div>

          <div>
            <label className="block text-gray-700">State</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange}
              className="w-full p-2 border rounded-lg outline-none" />
          </div>

          <div>
            <label className="block text-gray-700">Highest Qualification</label>
            <input type="text" name="qualification" value={formData.qualification} onChange={handleChange}
              className="w-full p-2 border rounded-lg outline-none" />
          </div>

          <div>
            <label className="block text-gray-700">University</label>
            <input type="text" name="university" value={formData.university} onChange={handleChange}
              className="w-full p-2 border rounded-lg outline-none" />
          </div>

          <div>
            <label className="block text-gray-700">Graduation Year</label>
            <input type="text" name="graduationYear" value={formData.graduationYear} onChange={handleChange}
              className="w-full p-2 border rounded-lg outline-none" />
          </div>

          <div>
            <label className="block text-gray-700">CGPA/Percentage</label>
            <input type="text" name="cgpa" value={formData.cgpa} onChange={handleChange}
              className="w-full p-2 border rounded-lg outline-none" />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Skills</label>
            <input type="text" name="skills" value={formData.skills} onChange={handleChange}
              className="w-full p-2 border rounded-lg outline-none" />
            <p className="text-sm text-gray-500">Separate skills with commas.</p>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Upload Resume</label>
            <input type="file" accept="application/pdf" onChange={handleResumeUpload}
              className="w-full p-2 border rounded-lg outline-none" />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700">Upload Certificates</label>
            <input type="file" accept="application/pdf" multiple onChange={handleCertificateUpload}
              className="w-full p-2 border rounded-lg outline-none" />
          </div>

          <div className="col-span-2 flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
