import { useState, useEffect, useCallback } from "react";
import BookingsList from "../components/BookingsList";
import FilterBar from "../../../components/common/FilterBar";
import { getAllBookings } from "../services/api";
import type { Booking } from "../../../types";
import toast from "react-hot-toast";

const CATEGORIES = ["venue", "caterer", "dj", "photographer", "decoration"];

const AdminBookings = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
    const [totalRevenue, setTotalRevenue] = useState(0);

    const fetchBookings = useCallback(async (filters: Record<string, any> = {}) => {
        try {
            setLoading(true);
            const response = await getAllBookings(filters);

            if (response.success && response.data) {
                const formattedBookings = response.data.map((b: any) => ({
                    id: b.id,
                    serviceTitle: b.service.title,
                    userName: b.user?.name || "Unknown",
                    startDate: new Date(b.startDate).toISOString().split('T')[0],
                    endDate: new Date(b.endDate).toISOString().split('T')[0],
                    totalPrice: b.totalPrice,
                    status: "confirmed",
                }));
                setBookings(formattedBookings);

                const total = formattedBookings.reduce((sum: number, b: any) => sum + (b.totalPrice || 0), 0);
                setTotalRevenue(total);
            }
        } catch (error: any) {
            console.error(error);
            toast.error("Failed to load bookings");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBookings(activeFilters);
    }, [fetchBookings, activeFilters]);

    const handleFilterChange = (filters: any) => {
        setActiveFilters(filters);
    };

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

            <FilterBar onFilter={handleFilterChange} categories={CATEGORIES} />

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
