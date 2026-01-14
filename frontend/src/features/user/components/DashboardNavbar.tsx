import { Star, LogOut } from "lucide-react";

interface DashboardNavbarProps {
    user: { name?: string; role?: string } | null;
    activeTab: "services" | "bookings";
    setActiveTab: (tab: "services" | "bookings") => void;
    onLogout: () => void;
}

const DashboardNavbar = ({ user, activeTab, setActiveTab, onLogout }: DashboardNavbarProps) => {
    return (
        <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-1.5 rounded-lg">
                            <Star className="w-5 h-5 text-white fill-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            EventMaster
                        </span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => setActiveTab("services")}
                            className={`text-sm font-medium transition-colors ${activeTab === 'services' ? 'text-indigo-400' : 'text-slate-400 hover:text-indigo-300'}`}
                        >
                            Browse Services
                        </button>
                        <button
                            onClick={() => setActiveTab("bookings")}
                            className={`text-sm font-medium transition-colors ${activeTab === 'bookings' ? 'text-indigo-400' : 'text-slate-400 hover:text-indigo-300'}`}
                        >
                            My Bookings
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex flex-col items-end text-right">
                            <span className="text-sm font-medium text-white">{user?.name || "Guest User"}</span>
                            <span className="text-xs text-slate-500">{user?.role || "User"}</span>
                        </div>
                        <button
                            onClick={onLogout}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700"
                            title="Logout"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
