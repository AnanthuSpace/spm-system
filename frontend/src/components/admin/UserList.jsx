import { useState, useEffect } from 'react';
import { getUsers } from '../../../api/adminApi';
import { Search, Eye, X } from 'lucide-react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsers(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]); 
    } finally {
      setLoading(false);
    }
  };

  const getFileUrl = (filePath) => {
    if (!filePath) return null;
    if (typeof filePath !== 'string') return null;
    
    if (filePath.startsWith('http')) return filePath;
    
    const baseUrl = "http://localhost:3000";
    return `${baseUrl.replace(/\/$/, '')}/${filePath.replace(/^\//, '')}`;
  };

  const filteredUsers = users.filter(user =>
    (user.fullName?.toLowerCase() || '').includes(searchText.toLowerCase()) ||
    (user.email?.toLowerCase() || '').includes(searchText.toLowerCase())
  );

  const handleView = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
    <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
    <div className="relative w-full md:w-96">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <input
        type="text"
        placeholder="Search users by name or email..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  </div>

  {loading ? (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ) : (
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qualification</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.fullName || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">{user.qualification || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700">{user.email || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                    onClick={() => handleView(user)}
                  >
                    <Eye size={16} className="mr-2" />
                    View Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-8 text-center">
                <div className="flex flex-col items-center justify-center">
                  <Search size={48} className="text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No users found</h3>
                  <p className="text-gray-500 mt-1">Try adjusting your search query</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )}

  {selectedUser && (
    <div className={`fixed inset-0 flex items-center justify-center bg-opacity-80 backdrop-blur-lg z-50 ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${isModalOpen ? 'scale-100' : 'scale-95'}`}>
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">User Profile</h3>
          <button 
            onClick={() => setIsModalOpen(false)}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <DetailItem label="Full Name" value={selectedUser.fullName} />
              <DetailItem label="Email" value={selectedUser.email} />
              <DetailItem label="Phone" value={selectedUser.phone} />
              <DetailItem label="Qualification" value={selectedUser.qualification} />
              <DetailItem label="CGPA" value={selectedUser.cgpa} />
            </div>
            <div className="space-y-4">
              <DetailItem label="University" value={selectedUser.university} />
              <DetailItem label="Graduation Year" value={selectedUser.graduationYear} />
              <DetailItem label="City" value={selectedUser.city} />
              <DetailItem label="State" value={selectedUser.state} />
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {selectedUser.skills?.length > 0 ? (
                  selectedUser.skills.map((skill, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">No skills listed</span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
  <div className="bg-gray-50 p-4 rounded-lg">
    <h4 className="text-lg font-semibold text-gray-800 mb-3">Documents</h4>
    <div className="space-y-3">
      {selectedUser.resume ? (
        <DocumentLink 
          url={getFileUrl(selectedUser.resume)} 
          label="Resume" 
        />
      ) : (
        <span className="text-gray-500">No resume uploaded</span>
      )}
      {selectedUser.certificates?.length > 0 ? (
        selectedUser.certificates.map((cert, index) => (
          <DocumentLink 
            key={index} 
            url={getFileUrl(cert)} 
            label={`Certificate ${index + 1}`} 
          />
        ))
      ) : (
        <span className="text-gray-500">No certificates uploaded</span>
      )}
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  )}
</div>
  );
};
const DetailItem = ({ label, value }) => (
    <div className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 font-medium">{value || 'Not provided'}</dd>
    </div>
  );
  
  const DocumentLink = ({ url, label }) => (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-center">
        <Eye size={16} className="mr-2 text-blue-500" />
        <span className="text-blue-600 hover:text-blue-800 font-medium">{label}</span>
      </div>
      <span className="text-xs text-gray-500">Click to view</span>
    </a>
  );

export default UserList;