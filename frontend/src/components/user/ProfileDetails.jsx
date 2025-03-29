import React from "react";
import { Pencil, FileText, Award, MapPin, Mail, Phone, GraduationCap, School, Calendar, Star } from "lucide-react";

const ProfileDetails = ({ user = {}, onEdit }) => {
  const getFileUrl = (filePath) => {
    if (!filePath) return null;
    if (typeof filePath !== 'string') return null;
    
    if (filePath.startsWith('http')) return filePath;
    
    const baseUrl = "http://localhost:3000";
    return `${baseUrl.replace(/\/$/, '')}/${filePath.replace(/^\//, '')}`;
  };

  const formatSkills = (skills) => {
    if (!skills) return null;
    if (Array.isArray(skills)) return skills.join(", ");
    if (typeof skills === 'string') return skills;
    return null;
  };

  return (
    <div className="p-4 md:p-8 relative max-w-6xl mx-auto bg-gray-50 rounded-xl">
      <button
        onClick={onEdit}
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-blue-50 transition-colors"
        aria-label="Edit profile"
        title="Edit profile"
      >
        <Pencil className="w-5 h-5 text-blue-600" />
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{user.fullName || 'Profile'}</h1>
        {user.email && (
          <p className="flex items-center text-gray-600 mt-1">
            <Mail className="w-4 h-4 mr-2" />
            {user.email}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
            <MapPin className="w-5 h-5 mr-2 text-blue-500" />
            Personal Details
          </h2>
          
          <div className="space-y-4">
            <InfoItem 
              icon={<Phone className="w-4 h-4" />} 
              label="Phone" 
              value={user.phone} 
            />
            <InfoItem 
              label="Location" 
              value={user.city && user.state ? `${user.city}, ${user.state}` : null} 
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
            <GraduationCap className="w-5 h-5 mr-2 text-blue-500" />
            Education
          </h2>
          
          <div className="space-y-4">
            <InfoItem 
              icon={<School className="w-4 h-4" />} 
              label="University" 
              value={user.university} 
            />
            <InfoItem 
              icon={<Star className="w-4 h-4" />} 
              label="Qualification" 
              value={user.qualification} 
            />
            <InfoItem 
              icon={<Calendar className="w-4 h-4" />} 
              label="Graduation Year" 
              value={user.graduationYear} 
            />
            <InfoItem 
              label="CGPA/Percentage" 
              value={user.cgpa} 
            />
            <InfoItem 
              label="Skills" 
              value={formatSkills(user.skills)} 
              isLast 
            />
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Documents</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DocumentCard
            title="Resume"
            icon={<FileText className="w-5 h-5" />}
            items={user.resume ? [user.resume] : []}
            getFileUrl={getFileUrl}
            emptyMessage="No resume uploaded yet"
          />
          
          <DocumentCard
            title="Certificates"
            icon={<Award className="w-5 h-5" />}
            items={Array.isArray(user.certificates) ? user.certificates : []}
            getFileUrl={getFileUrl}
            emptyMessage="No certificates uploaded yet"
          />
        </div>
      </div>
    </div>
  );
};

// Reusable Info Item Component
const InfoItem = ({ icon, label, value, isLast = false }) => (
  <div className={`pb-4 ${!isLast && 'border-b border-gray-100'}`}>
    <div className="flex items-start">
      {icon && <span className="mr-3 mt-0.5 text-gray-400">{icon}</span>}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-base font-semibold text-gray-800 break-words">
          {value || <span className="text-gray-400">Not specified</span>}
        </p>
      </div>
    </div>
  </div>
);

// Reusable Document Card Component
const DocumentCard = ({ title, icon, items, getFileUrl, emptyMessage }) => (
  <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors">
    <h3 className="flex items-center gap-2 font-medium text-gray-700 mb-3">
      {icon}
      {title}
      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full ml-auto">
        {items.length} {items.length === 1 ? 'file' : 'files'}
      </span>
    </h3>
    
    {items.length > 0 ? (
      <ul className="space-y-2">
        {items.map((item, index) => {
          const fileUrl = getFileUrl(item);
          if (!fileUrl) return null;
          
          return (
            <li key={index}>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm"
              >
                <FileText className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">
                  {title} {items.length > 1 ? index + 1 : ''}
                </span>
                <span className="text-xs text-gray-500 ml-auto">(View)</span>
              </a>
            </li>
          );
        })}
      </ul>
    ) : (
      <p className="text-gray-400 text-sm italic py-2">{emptyMessage}</p>
    )}
  </div>
);

export default ProfileDetails;