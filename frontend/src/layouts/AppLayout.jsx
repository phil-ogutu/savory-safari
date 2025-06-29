import React from "react";
import { Link, Outlet, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import {
  Home,
  Search,
  Compass,
  Upload,
  User,
  Settings,
  LogOut,
} from "lucide-react";
``;
import { ToastContainer } from "react-toastify";

const AppLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  console.log("user", user);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        <Sidebar userName={user?.name || "Guest"} />
        <div className="flex-1 ml-64 flex flex-col">
          <main className="flex-1 p-4 bg-gray-800 ">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col h-screen">
        {/* Fixed Top Header */}
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold text-orange">savorySafari</h1>
            <Link
              to={"/login"}
              className="flex items-center space-x-3 p-2 rounded hover:bg-light-orange text-orange-700"
            >
              <LogOut />
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 pt-16 pb-16 bg-gray-800">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Fixed Bottom Navigation */}
        <MobileNavigation />
      </div>
    </div>
  );
};

const Sidebar = ({ userName }) => (
  <div className="fixed left-0 top-0 w-64 bg-gray-200 shadow-xl h-screen flex flex-col justify-between z-40">
    <div>
      <div className="text-3xl font-bold text-orange p-4">savorySafari</div>
      <div className="px-4 text-sm text-gray-500">Welcome, {userName}</div>
      <nav className="mt-6 space-y-2">
        <SidebarItem icon={<Home />} label="Home" to="/home" />
        <SidebarItem icon={<Compass />} label="Explore" to="/explore" />
        <SidebarItem icon={<Upload />} label="Upload" to="/upload" />
        <SidebarItem icon={<User />} label="Profile" to="/profile" />
      </nav>
    </div>
    <div className="px-4 pb-4 space-y-2">
      <SidebarItem icon={<Settings />} label="Settings" to="/settings" />
      <SidebarItem
        icon={<LogOut />}
        label="Logout"
        to="/login"
        onClick={() => (window.location.href = "/login")}
      />
    </div>
  </div>
);

const SidebarItem = ({ icon, label, to, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center space-x-3 p-2  text-orange-700 ${
        isActive ? "bg-light-orange" : "hover:bg-light-orange"
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

const MobileNavigation = () => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
    <div className="flex justify-around items-center py-2">
      <MobileNavItem icon={<Home size={24} />} to="/home" />
      <MobileNavItem icon={<Search size={24} />} to="/search" />
      <MobileNavItem icon={<Upload size={24} />} to="/upload" />
      <MobileNavItem icon={<Compass size={24} />} to="/explore" />
      <MobileNavItem icon={<User size={24} />} to="/profile/" />
    </div>
  </nav>
);

const MobileNavItem = ({ icon, to }) => (
  <Link
    to={to}
    className="flex items-center justify-center p-3 text-gray-700 hover:text-orange-600 transition-colors"
  >
    {icon}
  </Link>
);

export { AppLayout, Sidebar, SidebarItem };
