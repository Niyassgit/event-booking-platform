import type { RouteObject } from "react-router-dom";
import { Role } from "../utils/constants";
import ProtectRoute from "./ProtectedRoute";
import UserDashboard from "../features/user/pages/UserDashboard";
import UserBookings from "../features/user/pages/UserBookings";

export const userRoutes: RouteObject = {
    path: "user",
    children: [
        {
            path: "dashboard",
            element: (
                <ProtectRoute role={Role.USER}>
                    <UserDashboard />
                </ProtectRoute>
            ),
        },
        {
            path: "bookings",
            element: (
                <ProtectRoute role={Role.USER}>
                    <UserBookings />
                </ProtectRoute>
            ),
        }
    ]
};
