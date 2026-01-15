import { useState } from "react";
import { MapPin, Star, Briefcase } from "lucide-react";
import Modal from "./Modal";
import type { Service } from "../types";

interface ServiceDetailsModalProps {
    service: Service | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirmBooking: (service: Service, date: string) => void;
}

const ServiceDetailsModal = ({ service, isOpen, onClose, onConfirmBooking }: ServiceDetailsModalProps) => {
    const [bookingDate, setBookingDate] = useState("");

    const handleConfirm = () => {
        if (!bookingDate) return alert("Please select a date");
        if (service) {
            onConfirmBooking(service, bookingDate);
        }
    };

    if (!service) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="relative h-64 sm:h-80">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-3xl font-bold text-white mb-2">{service.name}</h2>
                    <div className="flex items-center gap-4 text-sm text-slate-300">
                        <span className="bg-indigo-600 px-2 py-0.5 rounded text-white">{service.category}</span>
                        <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-slate-400" /> {service.location}</span>
                        <span className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" /> {service.rating}</span>
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-8 flex-1 overflow-y-auto bg-slate-900">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">About the Service</h3>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            {service.description}
                        </p>

                        <h3 className="text-lg font-semibold text-white mb-3">Capacity</h3>
                        <p className="text-slate-400 mb-6 flex items-center">
                            <Briefcase className="w-4 h-4 mr-2" />
                            {service.capacity}
                        </p>

                        <h3 className="text-lg font-semibold text-white mb-3">Availability</h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {service.availableDates.map(date => (
                                <span key={date} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs border border-slate-700">
                                    {date}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 h-fit">
                        <h3 className="text-lg font-semibold text-white mb-4">Book this Service</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-400 mb-1">Select Date</label>
                            <input
                                type="date"
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white focus:ring-2 focus:ring-indigo-500"
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                                style={{ colorScheme: "dark" }}
                            />
                        </div>

                        <div className="flex justify-between items-center mb-6 pt-4 border-t border-slate-700/50">
                            <span className="text-slate-400">Total Price</span>
                            <span className="text-2xl font-bold text-white">${service.price}</span>
                        </div>

                        <button
                            onClick={handleConfirm}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-semibold transition-all hover:shadow-[0_0_20px_-5px_#6366f1]"
                        >
                            Confirm Booking
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ServiceDetailsModal;
