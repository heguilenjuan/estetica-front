import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export const ProtectedRoute = () => {
  const { state } = useAuth();

  if (state.loading) return null;

  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
