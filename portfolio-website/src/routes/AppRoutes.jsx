import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import ProjectDetail from "../pages/ProjectDetail";
import BlogList from "../pages/BlogList";
import BlogDetail from "../pages/BlogDetail";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import NotFound from "../pages/NotFound";
import AdminRoute from "./AdminRoute";
import { useAuth } from "../contexts/AuthContext";
import { ADMIN_EMAIL } from "../utils/constants";

const AppRoutes = () => {
  const { user } = useAuth();
  const isAdmin = user?.email === ADMIN_EMAIL;
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogDetail />} />
      <Route path="/admin/login" element={isAdmin ? <Navigate to="/admin" replace /> : <AdminLogin />} />
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/secure" element={<AdminDashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
