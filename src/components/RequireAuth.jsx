import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();

  const { cookies } = useAuth();

  // console.log("allowedRoles: " + allowedRoles);
  // console.log("authRoles: " + auth.roles);
  // console.log("check", allowedRoles.includes(auth?.roles));

  return allowedRoles.includes(cookies.get("roles")) ? (
    <Outlet />
  ) : cookies.get("accessToken") ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
