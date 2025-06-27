import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "../components/Sidebar";
import { ToastContainer } from 'react-toastify';

const AppLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          SavorySafari
        </Link>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/upload">Upload</Link>
          <Link to="/profile">Profile</Link>
          {user ? (
            <>
              <span className="font-medium">Hi, {user.name}</span>
              <button onClick={logout} className="underline">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="underline">
              Login
            </Link>
          )}
        </div>
      </nav>

        <main className="py-6 px-4 ">    
          <Outlet />
        </main>

        <footer className="bg-white text-center p-4 mt-auto text-sm text-gray-500">
          © {new Date().getFullYear()} SavorySafari. All rights reserved.
        </footer>
    </div>
  );
};

export default AppLayout;
