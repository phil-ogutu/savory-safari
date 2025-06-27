import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) {
    // Redirect to login page, but pass the current location to return to after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated, render the children
  return children;
};

export default ProtectedRoute;
