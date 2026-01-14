import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import type { Role } from "../utils/constants";

interface ProtectedRouteProps {
  children: ReactNode;
  role?: Role;
}
const ProtectRoute = ({ children, role }: ProtectedRouteProps) => {
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

  if (!accessToken || !user) {
    return <Navigate to="/" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectRoute;
