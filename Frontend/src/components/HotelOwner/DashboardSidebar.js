import React from "react";
import { useRouter } from "next/router";
import {
  LayoutDashboard,
  SquarePlus,
  ListPlus,
  Star,
  Settings,
  ArrowLeft,
} from "lucide-react";

function DashboardSidebar({ isSidebarOpen, toggleSidebar }) {
  const router = useRouter();

  const sidebarItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Add Room",
      path: "/dashboard/addrooms",
      icon: <SquarePlus className="w-5 h-5" />,
    },
    {
      name: "List Room",
      path: "/dashboard/listrooms",
      icon: <ListPlus className="w-5 h-5" />,
    },
    // {
    //   name: "Reviews",
    //   path: "/dashboard/reviews",
    //   icon: <Star className="w-5 h-5" />,
    // },
    // {
    //   name: "Settings",
    //   path: "/dashboard/settings",
    //   icon: <Settings className="w-5 h-5" />,
    // },
  ];

  const handleNavigate = (path) => {
    router.push(path);
    if (window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Mobile Overlay - Lower z-index than navbar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-300 
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0 lg:z-10
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-300">
          <span className="text-black text-2xl font-semibold">Menu</span>
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-800 lg:hidden"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigate(item?.path)}
                className={`
                  group cursor-pointer flex items-center w-full px-3 py-2 text-sm font-medium rounded-md 
                  transition-colors duration-200
                  ${
                    router.pathname === item.path
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }
                `}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </div>

          {/* Bottom section */}
          <div className="mt-8 pt-8 border-t border-gray-300">
            <button
              onClick={() => router.push("/")}
              className="group h-10 rounded-lg flex    items-center bg-gray-800 w-60 px-3 py-2 text-sm font-medium text-white    hover:bg-gray-700 cursor-pointer transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              Back to Website
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}

export default DashboardSidebar;
