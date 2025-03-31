import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { fetchPendingCompaniesApi, verifyCompanyApi } from "../../api/adminApi"; 

const VerifyCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  // Fetch pending company verification requests
  const fetchCompanies = async () => {
    try {
      const result = await fetchPendingCompaniesApi();
      if (result.success) {
        setCompanies(result.pendingCompanies);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleVerification = async (companyId, status, reason = "") => {
    try {
      const result = await verifyCompanyApi(companyId, status, reason);
      if (result.success) {
        setCompanies((prev) => prev.filter((c) => c._id !== companyId));
      }
    } catch (error) {
      console.error(`Error updating company status to ${status}:`, error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const openRejectionModal = (company) => {
    setSelectedCompany(company);
    setIsRejectionModalOpen(true);
  };

  const closeRejectionModal = () => {
    setIsRejectionModalOpen(false);
    setSelectedCompany(null);
    setRejectionReason("");
  };

  const handleRejectionSubmit = () => {
    if (selectedCompany && rejectionReason.trim()) {
      handleVerification(selectedCompany._id, "rejected", rejectionReason);
      closeRejectionModal();
    }
  };

  return (
    <div className="flex flex-col h-full p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-semibold mb-4">Verify Companies</h1>

      {companies.length > 0 ? (
        <div className="space-y-4">
          {companies.map((company) => (
            <div
              key={company._id}
              className="border p-4 rounded-md shadow-sm hover:shadow-md transition bg-gray-50 flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold">{company.name}</h2>
                <p className="text-gray-600">Email: {company.email}</p>
                <p className="text-gray-600">Industry: {company.industry}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleVerification(company._id, "approved")}
                  className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition"
                >
                  <CheckCircle size={16} /> Approve
                </button>
                <button
                  onClick={() => openRejectionModal(company)}
                  className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                >
                  <XCircle size={16} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No pending verification requests.
        </p>
      )}

      {/* Rejection Modal */}
      {isRejectionModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-80 backdrop-blur-lg z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4">Reject {selectedCompany?.name}</h2>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rejection Reason*</label>
            <textarea
              className="w-full p-2 border rounded-md"
              rows={4}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              required
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={closeRejectionModal}
                className="px-4 py-2 border rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectionSubmit}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                disabled={!rejectionReason.trim()}
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyCompanies;
