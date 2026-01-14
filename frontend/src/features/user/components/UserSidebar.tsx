import { Compass, CalendarDays, LogOut } from "lucide-react";

interface UserSidebarProps {
    activeTab: "explore" | "bookings";
    setActiveTab: (tab: "explore" | "bookings") => void;
    onLogout: () => void;
    userName?: string;
}

const UserSidebar = ({ activeTab, setActiveTab, onLogout, userName }: UserSidebarProps) => {
    return (
        <aside className="w-64 border-r border-slate-800 bg-slate-900/50 p-6 flex flex-col h-screen sticky top-0">
            <div className="flex items-center gap-3 mb-10">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-xl text-white">
                    U
                </div>
                <div className="flex flex-col">
                    <span className="text-lg font-bold tracking-tight text-white">EventApp</span>
                    <span className="text-xs text-slate-500">User Dashboard</span>
                </div>
            </div>

            <div className="mb-8 p-4 bg-slate-800/50 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-500 mb-1">Welcome back,</p>
                <p className="font-semibold text-slate-200 truncate">{userName || "User"}</p>
            </div>

            <nav className="flex-1 space-y-2">
                <button
                    onClick={() => setActiveTab("explore")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "explore"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                        }`}
                >
                    <Compass size={20} />
                    <span className="font-medium">Explore Services</span>
                </button>

                <button
                    onClick={() => setActiveTab("bookings")}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "bookings"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                        }`}
                >
                    <CalendarDays size={20} />
                    <span className="font-medium">My Bookings</span>
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

export default UserSidebar;
