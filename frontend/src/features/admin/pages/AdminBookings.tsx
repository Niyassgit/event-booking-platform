import { useState, useEffect } from "react";
import BookingsList from "../components/BookingsList";
import { getAllBookings } from "../services/api";
import type { Booking } from "../../../types";
import toast from "react-hot-toast";
import { Filter } from "lucide-react";

export const CATEGORIES = ["All", "Venue", "Caterer", "Photographer", "DJ", "Decoration"];

const AdminBookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);

    // Filters
    const [category, setCategory] = useState("All");
    const [date, setDate] = useState("");

    // Totals
    const [totalRevenue, setTotalRevenue] = useState(0);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await getAllBookings({
                category: category !== "All" ? category : undefined,
                date: date || undefined
            });

            if (response.success && response.data) {
                const formattedBookings = response.data.map((b: any) => ({
                    id: b.id,
                    serviceTitle: b.service.title,
                    userName: b.user?.name || "Unknown",
                    startDate: new Date(b.startDate).toISOString().split('T')[0],
                    endDate: new Date(b.endDate).toISOString().split('T')[0],
                    totalPrice: b.totalPrice,
                    status: "confirmed", // Default status as per simplified model
                }));
                setBookings(formattedBookings);

                // Calculate total revenue
                const total = formattedBookings.reduce((sum: number, b: any) => sum + (b.totalPrice || 0), 0);
                setTotalRevenue(total);
            }
        } catch (error: any) {
            console.error(error);
            toast.error("Failed to load bookings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [category, date]);

    return (
        <div className="p-8 space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Bookings Management</h1>
                    <p className="text-slate-400 text-sm">Monitor and manage all service bookings</p>
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 flex items-center gap-4">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Total Revenue</span>
                    </div>
                    <span className="text-2xl font-bold text-white">₹ {totalRevenue.toLocaleString()}</span>
                </div>
            </header>

            {/* Filters */}
            <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2 text-slate-400 mr-2">
                    <Filter className="w-4 h-4" />
                    <span className="text-sm font-medium">Filters:</span>
                </div>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-slate-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
                >
                    {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-slate-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
                    style={{ colorScheme: "dark" }}
                />

                {(category !== "All" || date) && (
                    <button
                        onClick={() => { setCategory("All"); setDate(""); }}
                        className="text-sm text-indigo-400 hover:text-indigo-300 ml-auto"
                    >
                        Clear Filters
                    </button>
                )}
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="text-slate-400">Loading bookings...</div>
                </div>
            ) : (
                <BookingsList bookings={bookings} />
            )}
        </div>
    );
};

export default AdminBookings;
