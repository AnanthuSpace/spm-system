import { Menu } from "lucide-react";

const AdminNavbar = ({ toggleSidebar }) => {

  return (
    <nav className="bg-gray-900 shadow-md py-4 px-7 flex justify-between items-center text-white">
      <button
        className="lg:hidden p-2 rounded-md hover:bg-gray-200"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>
      <h1 className="text-xl font-semibold">SPM SYSTEM Dashboard</h1>
      <div className="flex items-center gap-4"></div>
    </nav>
  );
};

export default AdminNavbar;
