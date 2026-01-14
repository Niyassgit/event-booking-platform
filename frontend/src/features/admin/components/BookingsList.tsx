import type { Booking } from "../../../types";

interface BookingsListProps {
    bookings: Booking[];
}

const BookingsList = ({ bookings }: BookingsListProps) => {
    return (
        <div className="space-y-6">
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-slate-950/50 text-slate-200 uppercase tracking-wider font-semibold text-xs border-b border-slate-800">
                        <tr>
                            <th className="px-6 py-4">Booking ID</th>
                            <th className="px-6 py-4">Service</th>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Dates</th>
                            <th className="px-6 py-4">Total Price</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">#{booking.id}</td>
                                <td className="px-6 py-4 font-medium text-white">{booking.serviceTitle}</td>
                                <td className="px-6 py-4">{booking.userName}</td>
                                <td className="px-6 py-4 text-xs">
                                    {booking.startDate} <span className="text-slate-600 mx-1">to</span>{" "}
                                    {booking.endDate}
                                </td>
                                <td className="px-6 py-4">₹ {booking.totalPrice.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${booking.status === "confirmed"
                                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                : booking.status === "pending"
                                                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                                    : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                            }`}
                                    >
                                        {booking.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {bookings.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                    No bookings found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingsList;
