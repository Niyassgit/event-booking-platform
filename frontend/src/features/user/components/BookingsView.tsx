import { Clock } from "lucide-react";
import BookingCard from "./BookingCard";
import { type Booking } from "../data/mockData";

interface BookingsViewProps {
    bookings: Booking[];
}

const BookingsView = ({ bookings }: BookingsViewProps) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-semibold text-slate-300 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-400" /> Upcoming & Past Bookings
                </h3>
                {bookings.map(booking => (
                    <BookingCard key={booking.id} booking={booking} />
                ))}
                {bookings.length === 0 && (
                    <p className="text-slate-500">No bookings yet.</p>
                )}
            </section>

            <aside className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50 h-fit">
                <h3 className="text-lg font-bold text-white mb-4">Booking Summary</h3>
                <div className="space-y-4">
                    <div className="bg-slate-800 p-4 rounded-xl flex items-center justify-between">
                        <span className="text-slate-400">Total Bookings</span>
                        <span className="text-2xl font-bold text-white">{bookings.length}</span>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-xl flex items-center justify-between">
                        <span className="text-slate-400">Total Spent</span>
                        <span className="text-2xl font-bold text-emerald-400">
                            ${bookings.reduce((acc, curr) => acc + curr.price, 0)}
                        </span>
                    </div>
                    <div className="h-px bg-slate-700 my-4" />
                    <p className="text-sm text-slate-500">
                        Need help with a booking? <br />
                        <span className="text-indigo-400 cursor-pointer hover:underline">Contact Support</span>
                    </p>
                </div>
            </aside>
        </div>
    );
};

export default BookingsView;
