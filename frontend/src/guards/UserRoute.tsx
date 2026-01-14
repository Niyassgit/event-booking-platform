import type { RouteObject } from "react-router-dom";
import { Role } from "../utils/constants";
import ProtectRoute from "./ProtectedRoute";
import UserDashboard from "../features/user/pages/UserDashboard";

export const userRoutes: RouteObject = {
    path: "user/dashboard",
    element: (
        <ProtectRoute role={Role.USER}>
            <UserDashboard />
        </ProtectRoute>
    ),
};
