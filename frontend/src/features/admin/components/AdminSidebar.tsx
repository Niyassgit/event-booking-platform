import { LayoutDashboard, CalendarDays, LogOut } from "lucide-react";

interface AdminSidebarProps {
    activeTab: "services" | "bookings";
    setActiveTab: (tab: "services" | "bookings") => void;
    onLogout: () => void;
}

const AdminSidebar = ({ activeTab, setActiveTab, onLogout }: AdminSidebarProps) => {
    return (
        <aside className="w-64 border-r border-slate-800 bg-slate-900/50 p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-10">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-xl text-white">
                    A
                </div>
                <span className="text-lg font-bold tracking-tight text-white">Admin Panel</span>
            </div>

            <nav className="flex-1 space-y-2">
                <button
                    onClick={() => setActiveTab("services")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "services"
                            ? "bg-indigo-500/10 text-indigo-400"
                            : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                        }`}
                >
                    <LayoutDashboard size={20} />
                    <span className="font-medium">Services</span>
                </button>

                <button
                    onClick={() => setActiveTab("bookings")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "bookings"
                            ? "bg-indigo-500/10 text-indigo-400"
                            : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                        }`}
                >
                    <CalendarDays size={20} />
                    <span className="font-medium">Bookings</span>
                </button>
            </nav>

            <button
                onClick={onLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors mt-auto"
            >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
            </button>
        </aside>
    );
};

export default AdminSidebar;
