import { LogOut } from "lucide-react";

interface DashboardNavbarProps {
  user: { name?: string; role?: string } | null;
  activePage: "services" | "bookings";
  onLogout: () => void;
}

import { useNavigate } from "react-router-dom";
import favIcon from "@/assets/images/favIcon.png";

const DashboardNavbar = ({
  user,
  activePage,
  onLogout,
}: DashboardNavbarProps) => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className=" rounded-lg flex items-center justify-center">
              <img
                src={favIcon}
                alt="BetMoment logo"
                className="w-5 h-5 object-contain"
              />
            </div>

            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              BetMoment
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate("/user/dashboard")}
              className={`text-sm font-medium transition-colors ${activePage === "services"
                  ? "text-indigo-400"
                  : "text-slate-400 hover:text-indigo-300"
                }`}
            >
              Browse Services
            </button>
            <button
              onClick={() => navigate("/user/bookings")}
              className={`text-sm font-medium transition-colors ${activePage === "bookings"
                  ? "text-indigo-400"
                  : "text-slate-400 hover:text-indigo-300"
                }`}
            >
              My Bookings
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="text-sm font-medium text-white">
                {user?.name || "Guest User"}
              </span>
              <span className="text-xs text-slate-500">
                {user?.role || "User"}
              </span>
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
