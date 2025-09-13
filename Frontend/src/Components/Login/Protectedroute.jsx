// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const Protectedroute = ({ children }) => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    return <Navigate to="/login" replace />; // redirect if not logged in
  }
  return children;
};

export default Protectedroute;
