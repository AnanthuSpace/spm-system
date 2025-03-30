import React, { useState, useEffect } from "react";
import { updateCompanyProfileApi } from "../../api/comapnyApi";
import { toast } from "sonner";

const EditCompanyProfile = ({ onClose, onSave, company }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    address: "",
    foundedYear: "",
    industry: "",
    companySize: "",
    type: "",
    description: "",
    website: "",
  });

  useEffect(() => {
    if (company) {
      setFormData(company);
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateCompanyProfileApi(formData);
    if (result && result.success) {
        toast.success(result.message)
      onSave();
      onClose();
    } else {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Company Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Company Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="foundedYear"
          value={formData.foundedYear}
          onChange={handleChange}
          placeholder="Founded Year"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          placeholder="Industry"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="companySize"
          value={formData.companySize}
          onChange={handleChange}
          placeholder="Company Size"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Company Type"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        ></textarea>
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="Website URL"
          className="w-full p-2 border rounded"
        />
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCompanyProfile;
