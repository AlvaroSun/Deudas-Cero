import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";
import LoginModal from "./LoginModal";

export function ProtectedRoute({ children, adminOnly = false }: { children?: ReactNode; adminOnly?: boolean }) {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Mientras se verifica la sesión con el servidor no redirigimos
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-muted-foreground">
        Cargando...
      </div>
    );
  }
  if (!isAuthenticated) {
    // El panel de admin manda al login; el resto del contenido muestra la ventana de inicio de sesión
    if (adminOnly) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    return <LoginModal />;
  }
  if (adminOnly && user?.rol !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <>{children ?? <Outlet />}</>;
}
