import React from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
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
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* here are the Authentication routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes are wrapped in AppLayout */}
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
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
