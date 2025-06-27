import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Search from "../pages/Search";
import Upload from "../pages/Upload";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PostDetails from "../pages/PostDetails";
import UserSettings from "../pages/userSettings";
import RestaurantSettings from "../pages/restaurantSettings";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import { AppLayout } from "../layouts/AppLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root to /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Authentication routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Protected routes are wrapped in AppLayout */}
      <Route element={<AppLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/search" element={<Search />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/profile/user/settings/:id" element={<UserSettings />} />
        <Route path="/profile/restaurant/settings/:id" element={<RestaurantSettings />} />
        <Route
          path="/upload"
          element={
            <Upload />
            // <ProtectedRoute>
            //   <Upload />
            // </ProtectedRoute>
          }
        />
      </Route>
      {/* Fallback ama default route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
