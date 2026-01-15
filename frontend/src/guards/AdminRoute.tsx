import type { RouteObject } from "react-router-dom";
import { Role } from "../utils/constants";
import ProtectRoute from "./ProtectedRoute";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import AdminBookings from "../features/admin/pages/AdminBookings";
import AdminLayout from "../features/admin/components/AdminLayout";
import { Navigate } from "react-router-dom";

export const adminRoutes: RouteObject = {
  path: "admin",
  element: (
    <ProtectRoute role={Role.ADMIN}>
      <AdminLayout />
    </ProtectRoute>
  ),
  children: [
    {
      index: true,
      element: <Navigate to="dashboard" replace />,
    },
    {
      path: "dashboard",
      element: <AdminDashboard />,
    },
    {
      path: "bookings",
      element: <AdminBookings />,
    },
  ],
};