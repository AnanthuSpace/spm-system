import { useState } from "react";
import { Outlet } from "react-router-dom";
import CompanySideBar from "../components/company/CompanySideBar";
import CompanyNavBar from "../components/company/CompanyNavBar";

const CompanyLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      
      <CompanyNavBar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1 overflow-hidden">

        <CompanySideBar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 p-4 bg-gray-100 overflow-y-auto h-full">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default CompanyLayout;
