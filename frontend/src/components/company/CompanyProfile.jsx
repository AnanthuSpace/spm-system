import { Building2 } from "lucide-react";
import { useState } from "react";

const CompanyProfile = () => {
  const [company, setCompany] = useState({
    name: "Tech Corp Pvt Ltd",
    description:
      "A leading software development company specializing in AI and web solutions.",
    email: "contact@techcorp.com",
    phone: "+91 9876543210",
    address: "123, Silicon Valley, Bangalore, India",
    website: "https://www.techcorp.com",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedCompany, setEditedCompany] = useState({ ...company });

  const handleChange = (e) => {
    setEditedCompany({ ...editedCompany, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setCompany(editedCompany);
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto bg-white shadow-md rounded-lg p-6 w-full">
      <div className="flex items-center gap-4">
        {/* Company Logo */}
        <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-full">
          <Building2 className="text-gray-600 w-12 h-12" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{company.name}</h1>
          <p className="text-gray-600">{company.description}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-700">Email:</span>
          <span className="text-gray-500">{company.email}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-700">Phone:</span>
          <span className="text-gray-500">{company.phone}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-700">Address:</span>
          <span className="text-gray-500">{company.address}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-700">Website:</span>
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {company.website}
          </a>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-80 backdrop-blur-lg z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Company Profile</h2>

            <div className="space-y-3">
              <input
                type="text"
                name="name"
                value={editedCompany.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Company Name"
              />
              <input
                type="text"
                name="description"
                value={editedCompany.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Description"
              />
              <input
                type="email"
                name="email"
                value={editedCompany.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Email"
              />
              <input
                type="text"
                name="phone"
                value={editedCompany.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Phone"
              />
              <input
                type="text"
                name="address"
                value={editedCompany.address}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Address"
              />
              <input
                type="text"
                name="website"
                value={editedCompany.website}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Website"
              />
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
