// import React from "react";
// import { Link, Outlet } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import {
//   Home,
//   Search,
//   Compass,
//   Upload,
//   User,
//   Settings,
//   LogOut,
// } from "lucide-react";

// const AppLayout = () => {
//   const { user, logout } = useAuth();

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       <Sidebar userName={user?.name || "Guest"} />

//       {/* <div className="flex-1 flex flex-col">
//         <nav className="bg-white shadow p-4 flex justify-between items-center">
//           <Link to="/" className="text-2xl font-bold text-orange-600">
//             savorySafari
//           </Link>
//           <div className="space-x-4 text-orange-700 font-medium">
//             <Link to="/home">Home</Link>
//             <Link to="/explore">Explore</Link>
//             {user?.role === "Restaurant" && <Link to="/upload">Upload</Link>}
//             <Link to="/profile">Profile</Link>
//             {user ? (
//               <>
//                 <span>Hi, {user.name}</span>
//                 <button onClick={logout} className="underline">
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <Link to="/login" className="underline">
//                 Login
//               </Link>
//             )}
//           </div>
//         </nav>

//         <main className="flex-1 overflow-y-auto p-4">
//           <Outlet />
//         </main>

//         <footer className="bg-white text-center p-4 text-sm text-gray-500">
//           © {new Date().getFullYear()} savorySafari. All rights reserved.
//         </footer>
//       </div> */}
//       <div>
//         {/* Here we shall have the top bar (SavorySafari,logout-button)
// for small screens and should be fixed */}

//         <main className="flex-1 overflow-y-auto p-4">
//           <Outlet />
//           {/* Change the side bar to be at the bottom and be fixed */}
//         </main>

//         <footer className="bg-white text-center p-4 text-sm text-gray-500">
//           © {new Date().getFullYear()} savorySafari. All rights reserved.
//         </footer>
//       </div>
//     </div>
//   );
// };

// const Sidebar = ({ userName }) => (
//   // This is for large screens
//   <>
//     <div className="w-64 bg-white shadow-xl h-screen flex flex-col justify-between">
//       <div>
//         <div className="text-3xl font-bold text-orange-600 p-4">
//           savorySafari
//         </div>
//         <div className="px-4 text-sm text-gray-500">Welcome, {userName}</div>
//         <nav className="mt-6 space-y-2">
//           <SidebarItem icon={<Home />} label="Home" to="/" />
//           <SidebarItem icon={<Compass />} label="Explore" to="/explore" />
//           <SidebarItem icon={<Upload />} label="Upload" to="/upload" />
//           <SidebarItem icon={<User />} label="Profile" to="/profile" />
//         </nav>
//       </div>
//       <div className="px-4 pb-4 space-y-2">
//         <SidebarItem icon={<Settings />} label="Settings" to="/settings" />
//         <SidebarItem
//           icon={<LogOut />}
//           label="Logout"
//           to="#"
//           onClick={() => (window.location.href = "/logout")}
//         />
//       </div>
//     </div>
//   </>
// );

// const SidebarItem = ({ icon, label, to, onClick }) => (
//   <Link
//     to={to}
//     onClick={onClick}
//     className="flex items-center space-x-3 p-2 rounded hover:bg-yellow-100 text-orange-700"
//   >
//     {icon}
//     <span>{label}</span>
//   </Link>
// );

// export { AppLayout, Sidebar, SidebarItem };

import React from "react";
import { Link, Outlet } from "react-router-dom";
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

const AppLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        <Sidebar userName={user?.name || "Guest"} />
        <div className="flex-1 ml-64 flex flex-col">
          <main className="flex-1 p-4">
            <Outlet />
          </main>
          <footer className="bg-white text-center p-4 text-sm text-gray-500">
            © {new Date().getFullYear()} savorySafari. All rights reserved.
          </footer>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col h-screen">
        {/* Fixed Top Header */}
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 py-3">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold text-orange-600">savorySafari</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 pt-16 pb-16">
          <Outlet />
        </main>

        {/* Fixed Bottom Navigation */}
        <MobileNavigation />
      </div>
    </div>
  );
};

const Sidebar = ({ userName }) => (
  <div className="fixed left-0 top-0 w-64 bg-white shadow-xl h-screen flex flex-col justify-between z-40">
    <div>
      <div className="text-3xl font-bold text-orange-600 p-4">savorySafari</div>
      <div className="px-4 text-sm text-gray-500">Welcome, {userName}</div>
      <nav className="mt-6 space-y-2">
        <SidebarItem icon={<Home />} label="Home" to="/home" />
        <SidebarItem icon={<Compass />} label="Explore" to="/explore" />
        <SidebarItem icon={<Upload />} label="Upload" to="/upload" />
        <SidebarItem icon={<User />} label="Profile" to="/profile/:username" />
      </nav>
    </div>
    <div className="px-4 pb-4 space-y-2">
      <SidebarItem icon={<Settings />} label="Settings" to="/settings" />
      <SidebarItem
        icon={<LogOut />}
        label="Logout"
        to="#"
        onClick={() => (window.location.href = "/login")}
      />
    </div>
  </div>
);

const SidebarItem = ({ icon, label, to, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center space-x-3 p-2 rounded hover:bg-yellow-100 text-orange-700"
  >
    {icon}
    <span>{label}</span>
  </Link>
);

const MobileNavigation = () => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
    <div className="flex justify-around items-center py-2">
      <MobileNavItem icon={<Home size={24} />} to="/home" />
      <MobileNavItem icon={<Search size={24} />} to="/search" />
      <MobileNavItem icon={<Upload size={24} />} to="/upload" />
      <MobileNavItem icon={<Compass size={24} />} to="/explore" />
      <MobileNavItem icon={<User size={24} />} to="/profile/:username" />
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
