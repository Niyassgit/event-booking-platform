import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Star, Briefcase, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { fetchServiceById, createBooking } from "../services/userApi";
import type { Service } from "../types";

const ServiceDetails = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [bookingDate, setBookingDate] = useState("");

    useEffect(() => {
        const loadService = async () => {
            if (!serviceId) return;
            try {
                const data = await fetchServiceById(serviceId);
                setService(data);
            } catch (error) {
                console.error("Failed to load service details", error);
                toast.error("Failed to load service details");
                // navigate("/user/dashboard");
            } finally {
                setLoading(false);
            }
        };
        loadService();
    }, [serviceId, navigate]);

    const handleConfirmBooking = async () => {
        if (!bookingDate) return toast.error("Please select a date");
        if (!service) return;

        try {
            await createBooking(service.id, bookingDate);
            toast.success(`Booking confirmed for ${service.name} on ${bookingDate}!`);
            navigate("/user/bookings");
        } catch (error) {
            toast.error("Booking failed. Please try again.");
            console.error(error);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
    );

    if (!service) return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl font-bold mb-4">Service not found</h2>
            <button
                onClick={() => navigate("/user/dashboard")}
                className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
            <div className="relative h-[50vh]">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent" />

                <button
                    onClick={() => navigate("/user/dashboard")}
                    className="absolute top-6 left-6 p-3 bg-black/30 backdrop-blur-md rounded-full hover:bg-black/50 transition-colors text-white z-10"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{service.name}</h1>
                    <div className="flex flex-wrap items-center gap-6 text-slate-300">
                        <span className="bg-indigo-600/90 backdrop-blur-sm px-3 py-1 rounded-lg text-white font-medium">
                            {service.category}
                        </span>
                        <span className="flex items-center text-lg">
                            <MapPin className="w-5 h-5 mr-2 text-indigo-400" /> {service.location}
                        </span>
                        <span className="flex items-center text-lg">
                            <Star className="w-5 h-5 mr-2 text-yellow-400 fill-yellow-400" /> {service.rating}
                        </span>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 sm:px-12 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">About the Service</h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                {service.description}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Capacity & Features</h2>
                            <div className="flex items-center text-slate-400 text-lg bg-slate-800/30 p-4 rounded-xl w-fit border border-slate-700/50">
                                <Briefcase className="w-5 h-5 mr-3 text-indigo-400" />
                                {service.capacity}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">Availability</h2>
                            <div className="flex flex-wrap gap-3">
                                {service.availableDates.length > 0 ? (
                                    service.availableDates.map(date => (
                                        <span key={date} className="bg-slate-800 text-slate-300 px-4 py-2 rounded-full border border-slate-700">
                                            {date}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-slate-500 italic">Contact for availability</span>
                                )}
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 sticky top-8">
                            <h2 className="text-2xl font-bold text-white mb-6">Book this Service</h2>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-400 mb-2">Select Date</label>
                                <input
                                    type="date"
                                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-indigo-500 shadow-inner"
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    style={{ colorScheme: "dark" }}
                                />
                            </div>

                            <div className="flex justify-between items-center mb-8 pt-6 border-t border-slate-700/50">
                                <span className="text-slate-400">Total Price</span>
                                <span className="text-3xl font-bold text-emerald-400">${service.price}</span>
                            </div>

                            <button
                                onClick={handleConfirmBooking}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold text-lg transition-all hover:shadow-[0_0_20px_-5px_#6366f1] active:scale-[0.98]"
                            >
                                Confirm Booking
                            </button>

                            <p className="mt-4 text-xs text-center text-slate-500">
                                Free cancellation up to 48 hours before the event.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ServiceDetails;
