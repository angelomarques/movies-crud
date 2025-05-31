import { useAuthStore } from "@/store/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function ProtectedRouteLayout() {
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = !!token;

  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
