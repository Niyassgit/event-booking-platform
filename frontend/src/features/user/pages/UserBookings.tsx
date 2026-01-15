import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../auth/authSlice";
import type { RootState } from "../../../app/store";
import type { Booking } from "../types";
import { fetchUserBookings } from "../services/userApi";
import DashboardNavbar from "../components/DashboardNavbar";
import BookingsView from "../components/BookingsView";

const UserBookings = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const [bookings, setBookings] = useState<Booking[]>([]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    useEffect(() => {
        const loadBookings = async () => {
            try {
                const data = await fetchUserBookings();
                setBookings(data);
            } catch (error) {
                console.error("Failed to load bookings", error);
            }
        };
        loadBookings();
    }, []);

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
            <DashboardNavbar
                user={user}
                activePage="bookings"
                onLogout={handleLogout}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Your Bookings
                    </h1>
                    <p className="text-slate-400 max-w-2xl">
                        Manage your past and upcoming event reservations.
                    </p>
                </header>

                <BookingsView bookings={bookings} />
            </main>
        </div>
    );
};

export default UserBookings;
