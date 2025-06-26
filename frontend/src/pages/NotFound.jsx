import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-gray-600 mb-4">Oops! Page not found.</p>
      <Link to="/home" className="text-blue-500 hover:underline">
        Return Home
      </Link>
    </div>
  );
}
