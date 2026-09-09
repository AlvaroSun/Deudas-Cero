import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";

export function ProtectedRoute({ children, adminOnly = false }: { children: ReactNode; adminOnly?: boolean }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  if (adminOnly && user?.rol !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
