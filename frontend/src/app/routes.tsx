import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "../guards/AdminRoute";
import { userRoutes } from "../guards/UserRoute";
import LandingPage from "../features/auth/pages/LandingPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  adminRoutes,
  userRoutes,
]);
