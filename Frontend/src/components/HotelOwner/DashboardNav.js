import React, { useState } from "react";
import { useRouter } from "next/router";
import { assets } from "../../../public/assets";

function DashboardNavbar({ toggleSidebar, isSidebarOpen }) {
  const router = useRouter();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

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

            <div className="flex items-center gap-2">
              <div className=" invert p-2 rounded-lg">
                <img
                  src="/logo.png"
                  alt="Hotel Dashboard"
                  className="h-8 w-auto"
                />
              </div>
               
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <div 
                className="cursor-pointer"
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              >
                <img
                  src={assets.userIcon?.src}
                  className="w-9 h-9 bg-black rounded-full"
                  alt="User Profile"
                />
              </div>
              
              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Account Settings
                  </a>
                  <hr className="my-1" />
                  <button
                    onClick={() => router.push("/")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar;