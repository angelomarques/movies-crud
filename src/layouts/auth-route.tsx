import { Navigate, Outlet } from "react-router-dom";

export function AuthRouteLayout() {
  // TODO: implement authentication logic
  const isAuthenticated = true;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
