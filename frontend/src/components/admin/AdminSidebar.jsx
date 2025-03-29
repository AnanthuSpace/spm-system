import { X, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  return (
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
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
