import React, { useState } from "react";

import { UserButton } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";

function DashboardNavbar({ toggleSidebar, isSidebarOpen }) {
  const { user } = useAppContext();

  return (
    <nav className="bg-white   border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="px-4 sm:px-6 lg:px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {isSidebarOpen ? (
                  // X icon when sidebar is open
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  // Hamburger icon when sidebar is closed
                  <>
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
          <div className="flex items-end gap-2">
            {user && <UserButton></UserButton>}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar;
