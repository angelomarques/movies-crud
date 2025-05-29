import { Navigate, Outlet, useLocation } from "react-router-dom";

export function ProtectedRouteLayout() {
  // TODO: implement authentication logic
  const isAuthenticated = false;

  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
