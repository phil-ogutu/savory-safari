import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-black text-white p-4 flex justify-between">
        <Link to="/" className="font-bold text-xl">
          SavorySafari
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <span>Hi, {user.name}</span>
              <button onClick={logout} className="underline">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </nav>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-gray-200 p-4 text-center">
        © 2025 SavorySafari
      </footer>
    </div>
  );
}
