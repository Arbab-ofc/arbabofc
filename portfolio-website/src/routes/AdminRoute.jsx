import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ADMIN_EMAIL } from "../utils/constants";

const AdminRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  const isAdmin = user?.email === ADMIN_EMAIL;
  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
