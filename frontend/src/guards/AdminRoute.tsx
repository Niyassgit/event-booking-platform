import type { RouteObject } from "react-router-dom";
import { Role } from "../utils/constants";
import ProtectRoute from "./ProtectedRoute";
import AdminDashboard from "../features/admin/pages/AdminDashboard";

export const adminRoutes: RouteObject = {
  path: "admin/dashboard",
  element: (
    <ProtectRoute role={Role.ADMIN}>
      <AdminDashboard />
    </ProtectRoute>
  ),
};