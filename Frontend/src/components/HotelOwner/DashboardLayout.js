import React, { useEffect } from "react";
import DashboardNav from "./DashboardNav";
import DashboardSidebar from "./DashboardSidebar";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";

function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { router, isOwner } = useAppContext();

  // useEffect(() => {
  //   if (!isOwner) {
  //     router.push('/')
  //   }
  // },[isOwner])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Navbar - Always visible with highest z-index */}
      <DashboardNav
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        
        {/* Main Content Area */}
        <div className="flex-1 lg:ml-0">
          <main className="pt-16 min-h-screen">
            <div className="px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;