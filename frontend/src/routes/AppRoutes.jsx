import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Explore from "../pages/Explore";
import Upload from "../pages/Upload";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PostDetails from "../pages/PostDetails";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import { AppLayout } from "../layouts/AppLayout";

const AppRoutes = () => {
  return (
    <AppLayout>
      <Routes>
        {/* here are the Authentication routes */}

        <Route index path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes are wrapped in AppLayout */}
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Fallback ama default route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
};

export default AppRoutes;
