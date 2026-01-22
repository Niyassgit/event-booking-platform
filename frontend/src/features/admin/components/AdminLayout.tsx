import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { logout } from "../../auth/authSlice";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    // Determine active tab based on current path
    const activeTab = location.pathname.includes("bookings")
        ? "bookings"
        : location.pathname.includes("users")
            ? "users"
            : "services";

    const handleTabChange = (tab: "services" | "bookings" | "users") => {
        if (tab === "services") navigate("/admin/dashboard");
        if (tab === "bookings") navigate("/admin/bookings");
        if (tab === "users") navigate("/admin/users");
    };

    return (
        <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
            <AdminSidebar
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                onLogout={handleLogout}
            />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-20">
                    <h1 className="text-xl font-semibold text-slate-200 capitalize">
                        {activeTab} Management
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-medium">
                            AD
                        </div>
                    </div>
                </header>

                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
