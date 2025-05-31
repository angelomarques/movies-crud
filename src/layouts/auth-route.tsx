import { useAuthStore } from "@/store/auth";
import { Navigate, Outlet } from "react-router-dom";

export function AuthRouteLayout() {
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = !!token;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
