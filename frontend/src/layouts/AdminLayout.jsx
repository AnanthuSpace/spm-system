import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      
    <AdminNavbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

    <div className="flex flex-1 overflow-hidden">

      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

      <main className="flex-1 p-4 bg-gray-100 overflow-y-auto h-full">
        <Outlet /> 
      </main>
    </div>
  </div>
  );
};

export default AdminLayout;
