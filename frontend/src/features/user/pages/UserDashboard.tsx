import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    LogOut,
    Search,
    Calendar,
    MapPin,
    Star,
    Clock,
    Briefcase,
    X,
} from "lucide-react";
import { logout } from "../../auth/authSlice";
import type { RootState } from "../../../app/store";

// --- Mock Data ---

const CATEGORIES = ["All", "Venue", "Catering", "Photography", "Music", "Decor"];

const SERVICES = [
    {
        id: "1",
        name: "Grand Ballroom Strategy",
        category: "Venue",
        description: "A luxurious ballroom perfect for grand weddings and corporate galas. Features crystal chandeliers and a spacious dance floor.",
        price: 5000,
        location: "Downtown City Center",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800",
        capacity: "500 Guests",
        availableDates: ["2024-10-20", "2024-10-25"]
    },
    {
        id: "2",
        name: "Gourmet Delights Catering",
        category: "Catering",
        description: "Exquisite culinary experiences tailored to your event. Offering a wide range of international cuisines.",
        price: 1500,
        location: "Metro Area",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800",
        capacity: "Unlimited",
        availableDates: ["2024-10-22", "2024-11-01"]
    },
    {
        id: "3",
        name: "Luminous Photography",
        category: "Photography",
        description: "Capturing your most precious moments with artistic flair. specialized in candid and portrait photography.",
        price: 800,
        location: "Clifton Hill",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
        capacity: "1 Event/Day",
        availableDates: ["2024-10-15", "2024-10-30"]
    },
    {
        id: "4",
        name: "Sunset Garden",
        category: "Venue",
        description: "An open-air garden venue with breathtaking sunset views. Ideal for intimate gatherings and outdoor parties.",
        price: 3000,
        location: "Westside Bay",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1464366400600-7168b8af0bc3?auto=format&fit=crop&q=80&w=800",
        capacity: "200 Guests",
        availableDates: ["2024-11-05", "2024-11-12"]
    },
    {
        id: "5",
        name: "Harmony Jazz Band",
        category: "Music",
        description: "Live jazz band to elevate the atmosphere of your event. Smooth tunes and classic hits.",
        price: 1200,
        location: "Citywide",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
        capacity: "N/A",
        availableDates: ["2024-10-28", "2024-11-15"]
    },
    {
        id: "6",
        name: "Elegant Decorators",
        category: "Decor",
        description: "Transforming spaces into magical environments. Custom themes, floral arrangements, and lighting.",
        price: 2000,
        location: "North District",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&q=80&w=800",
        capacity: "N/A",
        availableDates: ["2024-10-21", "2024-11-08"]
    }
];

const MOCK_BOOKINGS = [
    {
        id: "b1",
        serviceName: "Grand Ballroom Strategy",
        date: "2024-09-15",
        status: "completed",
        price: 5000,
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=100"
    },
    {
        id: "b2",
        serviceName: "Luminous Photography",
        date: "2024-11-20",
        status: "confirmed",
        price: 800,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=100"
    },
    {
        id: "b3",
        serviceName: "Gourmet Delights Catering",
        date: "2024-12-05",
        status: "pending",
        price: 1500,
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=100"
    }
];

// --- Components ---

const ServiceCard = ({ service, onBook }: { service: typeof SERVICES[0]; onBook: (service: typeof SERVICES[0]) => void }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden flex flex-col group"
    >
        <div className="relative h-48 overflow-hidden">
            <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-medium text-white flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                {service.rating}
            </div>
            <div className="absolute top-3 left-3 bg-indigo-500/80 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-medium text-white">
                {service.category}
            </div>
        </div>
        <div className="p-5 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-white leading-tight">{service.name}</h3>
            </div>
            <div className="flex items-center text-slate-400 text-sm mb-3">
                <MapPin className="w-3.5 h-3.5 mr-1" />
                {service.location}
            </div>
            <p className="text-slate-400 text-sm mb-4 line-clamp-2">{service.description}</p>

            <div className="mt-auto pt-4 border-t border-slate-700/50 flex justify-between items-center text-sm">
                <div>
                    <span className="text-emerald-400 font-bold text-lg">${service.price}</span>
                    <span className="text-slate-500 text-xs ml-1">/ event</span>
                </div>
                <button
                    onClick={() => onBook(service)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors text-xs"
                >
                    View Details
                </button>
            </div>
        </div>
    </motion.div>
);

const BookingCard = ({ booking }: { booking: typeof MOCK_BOOKINGS[0] }) => {
    const statusColors = {
        completed: "text-emerald-400 bg-emerald-400/10",
        confirmed: "text-blue-400 bg-blue-400/10",
        pending: "text-orange-400 bg-orange-400/10",
        cancelled: "text-red-400 bg-red-400/10"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex items-center gap-4 hover:bg-slate-800 transition-colors"
        >
            <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                <img src={booking.image} alt={booking.serviceName} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold truncate">{booking.serviceName}</h4>
                <div className="flex items-center text-slate-400 text-sm mt-1">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    {booking.date}
                </div>
            </div>
            <div className="text-right">
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium capitalize mb-1 ${statusColors[booking.status as keyof typeof statusColors]}`}>
                    {booking.status}
                </span>
                <div className="text-slate-300 font-medium text-sm">${booking.price}</div>
            </div>
        </motion.div>
    );
};

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => (
    <AnimatePresence>
        {isOpen && (
            <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="fixed inset-0 m-auto z-50 max-w-2xl max-h-[90vh] overflow-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-0 flex flex-col"
                    style={{ width: 'calc(100% - 2rem)' }}
                >
                    <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white z-10 p-1 bg-black/20 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                    {children}
                </motion.div>
            </>
        )}
    </AnimatePresence>
);

const UserDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const [activeTab, setActiveTab] = useState<"services" | "bookings">("services");
    const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");
    const [filterLocation, setFilterLocation] = useState("");
    const [filterPriceRange, setFilterPriceRange] = useState<[number, number]>([0, 10000]);
    const [bookingDate, setBookingDate] = useState("");
    const [bookings, setBookings] = useState(MOCK_BOOKINGS);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const filteredServices = SERVICES.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === "All" || service.category === filterCategory;
        const matchesLocation = service.location.toLowerCase().includes(filterLocation.toLowerCase());
        const matchesPrice = service.price >= filterPriceRange[0] && service.price <= filterPriceRange[1];

        return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
    });

    const handleBookService = () => {
        if (!bookingDate) return alert("Please select a date");

        const newBooking = {
            id: `b${Date.now()}`,
            serviceName: selectedService?.name || "Unknown Service",
            date: bookingDate,
            status: "pending",
            price: selectedService?.price || 0,
            image: selectedService?.image || ""
        };

        setBookings([newBooking, ...bookings]);
        alert(`Booking confirmed for ${selectedService?.name} on ${bookingDate}!`);
        setSelectedService(null);
        setBookingDate("");
        setActiveTab("bookings");
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
            {/* Navbar */}
            <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <div className="bg-indigo-600 p-1.5 rounded-lg">
                                <Star className="w-5 h-5 text-white fill-white" />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                                EventMaster
                            </span>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            <button
                                onClick={() => setActiveTab("services")}
                                className={`text-sm font-medium transition-colors ${activeTab === 'services' ? 'text-indigo-400' : 'text-slate-400 hover:text-indigo-300'}`}
                            >
                                Browse Services
                            </button>
                            <button
                                onClick={() => setActiveTab("bookings")}
                                className={`text-sm font-medium transition-colors ${activeTab === 'bookings' ? 'text-indigo-400' : 'text-slate-400 hover:text-indigo-300'}`}
                            >
                                My Bookings
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex flex-col items-end text-right">
                                <span className="text-sm font-medium text-white">{user?.name || "Guest User"}</span>
                                <span className="text-xs text-slate-500">{user?.role || "User"}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700"
                                title="Logout"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Dashboard Header */}
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {activeTab === 'services' ? 'Find Your Perfect Service' : 'Your Bookings'}
                    </h1>
                    <p className="text-slate-400 max-w-2xl">
                        {activeTab === 'services'
                            ? 'Discover top-rated venues, caterers, and photographers for your next big event.'
                            : 'Manage your past and upcoming event reservations.'}
                    </p>
                </header>

                {activeTab === 'services' && (
                    <div className="space-y-6">
                        {/* Filters Section */}
                        <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-4 border border-slate-700/50">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                <div className="md:col-span-4 relative">
                                    <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="Search services..."
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <select
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    >
                                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                                <div className="md:col-span-3 relative">
                                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="Location..."
                                        className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-white focus:ring-2 focus:ring-indigo-500"
                                        value={filterLocation}
                                        onChange={(e) => setFilterLocation(e.target.value)}
                                    />
                                </div>
                                <div className="md:col-span-3 flex items-center gap-2">
                                    <label className="text-sm text-slate-400 whitespace-nowrap">Max Price:</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="10000"
                                        step="100"
                                        value={filterPriceRange[1]}
                                        onChange={(e) => setFilterPriceRange([0, parseInt(e.target.value)])}
                                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                    />
                                    <span className="text-sm font-medium text-white min-w-[3rem]">${filterPriceRange[1]}</span>
                                </div>
                            </div>
                        </div>

                        {/* Services Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <AnimatePresence>
                                {filteredServices.map((service) => (
                                    <ServiceCard key={service.id} service={service} onBook={setSelectedService} />
                                ))}
                            </AnimatePresence>
                        </div>

                        {filteredServices.length === 0 && (
                            <div className="text-center py-20">
                                <div className="bg-slate-800/50 inline-flex p-4 rounded-full mb-4">
                                    <Search className="w-8 h-8 text-slate-500" />
                                </div>
                                <h3 className="text-lg font-medium text-white">No services found</h3>
                                <p className="text-slate-400">Try adjusting your search or filters.</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'bookings' && (
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
                )}
            </main>

            {/* Service Details Modal */}
            <Modal isOpen={!!selectedService} onClose={() => setSelectedService(null)}>
                {selectedService && (
                    <>
                        <div className="relative h-64 sm:h-80">
                            <img src={selectedService.image} alt={selectedService.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <h2 className="text-3xl font-bold text-white mb-2">{selectedService.name}</h2>
                                <div className="flex items-center gap-4 text-sm text-slate-300">
                                    <span className="bg-indigo-600 px-2 py-0.5 rounded text-white">{selectedService.category}</span>
                                    <span className="flex items-center"><MapPin className="w-4 h-4 mr-1 text-slate-400" /> {selectedService.location}</span>
                                    <span className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" /> {selectedService.rating}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 flex-1 overflow-y-auto bg-slate-900">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-3">About the Service</h3>
                                    <p className="text-slate-400 leading-relaxed mb-6">
                                        {selectedService.description}
                                    </p>

                                    <h3 className="text-lg font-semibold text-white mb-3">Capacity</h3>
                                    <p className="text-slate-400 mb-6 flex items-center">
                                        <Briefcase className="w-4 h-4 mr-2" />
                                        {selectedService.capacity}
                                    </p>

                                    <h3 className="text-lg font-semibold text-white mb-3">Availability</h3>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {selectedService.availableDates.map(date => (
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
                                        />
                                    </div>

                                    <div className="flex justify-between items-center mb-6 pt-4 border-t border-slate-700/50">
                                        <span className="text-slate-400">Total Price</span>
                                        <span className="text-2xl font-bold text-white">${selectedService.price}</span>
                                    </div>

                                    <button
                                        onClick={handleBookService}
                                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-semibold transition-all hover:shadow-[0_0_20px_-5px_#6366f1]"
                                    >
                                        Confirm Booking
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default UserDashboard;
