import { X, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logout Successfully");
    navigate("/admin");
    setLogoutDialogOpen(false);
  };
  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full w-56 bg-gray-900 text-white transform transition-transform lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <button
            className="lg:hidden p-2 rounded-md text-white hover:bg-gray-800"
            onClick={toggleSidebar}
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col justify-between h-full">
          <ul className="space-y-4 flex-grow p-4">
            <li>
              <Link
                to="/admin/dashboard"
                className="block px-4 py-2 rounded hover:bg-gray-800"
              >
                User List
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/company"
                className="block px-4 py-2 rounded hover:bg-gray-800"
              >
                Company List
              </Link>
            </li>
            <li>
              <Link
                to="/admin/dashboard/verification"
                className="block px-4 py-2 rounded hover:bg-gray-800"
              >
                Verification
              </Link>
            </li>
          </ul>

          <div className="p-4 border-t border-gray-700">
            <button
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
              onClick={() => setLogoutDialogOpen(true)}
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </nav>
      </aside>
      {logoutDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-80 backdrop-blur-lg z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setLogoutDialogOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
