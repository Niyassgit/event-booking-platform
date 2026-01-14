import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../auth/authSlice";
import type { RootState } from "../../../app/store";

const UserDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-slate-900 p-8 text-white">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-indigo-400">User Dashboard</h1>
                        <p className="text-slate-400 mt-1">Welcome back, {user?.name}!</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/20 transition-colors"
                    >
                        Logout
                    </button>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <h2 className="text-xl font-semibold mb-4 text-emerald-400">My Events</h2>
                        <p className="text-slate-400">You haven't booked any events yet.</p>
                        <button className="mt-4 text-sm text-indigo-400 hover:text-indigo-300">
                            Browse Events &rarr;
                        </button>
                    </div>

                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                        <h2 className="text-xl font-semibold mb-4 text-blue-400">Profile Settings</h2>
                        <div className="space-y-2 text-sm text-slate-300">
                            <p><span className="text-slate-500">Email:</span> {user?.email}</p>
                            <p><span className="text-slate-500">Role:</span> {user?.role}</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UserDashboard;
