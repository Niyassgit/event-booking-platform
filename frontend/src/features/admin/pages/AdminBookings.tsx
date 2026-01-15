import { useState } from "react";
import BookingsList from "../components/BookingsList";
import type { Booking } from "../../../types";

const AdminBookings = () => {
    const [bookings] = useState<Booking[]>([
        {
            id: "101",
            serviceTitle: "Royal Grand Hall",
            userName: "John Doe",
            startDate: "2024-05-10",
            endDate: "2024-05-12",
            totalPrice: 100000,
            status: "confirmed",
        },
    ]);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-white mb-6">Bookings Management</h1>
            <BookingsList bookings={bookings} />
        </div>
    );
};

export default AdminBookings;
