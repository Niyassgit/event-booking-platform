import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../auth/authSlice";
import type { RootState } from "../../../app/store";
import { SERVICES, MOCK_BOOKINGS, type Service } from "../data/mockData";
import DashboardNavbar from "../components/DashboardNavbar";
import ServicesView from "../components/ServicesView";
import BookingsView from "../components/BookingsView";
import ServiceDetailsModal from "../components/ServiceDetailsModal";

const UserDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const [activeTab, setActiveTab] = useState<"services" | "bookings">("services");
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");
    const [filterLocation, setFilterLocation] = useState("");
    const [filterPriceRange, setFilterPriceRange] = useState<[number, number]>([0, 10000]);
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

    const handleConfirmBooking = (service: Service, date: string) => {
        const newBooking = {
            id: `b${Date.now()}`,
            serviceName: service.name,
            date: date,
            status: "pending",
            price: service.price,
            image: service.image
        };

        setBookings([newBooking, ...bookings]);
        alert(`Booking confirmed for ${service.name} on ${date}!`);
        setSelectedService(null);
        setActiveTab("bookings");
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
            <DashboardNavbar
                user={user}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onLogout={handleLogout}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                    <ServicesView
                        filteredServices={filteredServices}
                        onBook={setSelectedService}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        filterCategory={filterCategory}
                        setFilterCategory={setFilterCategory}
                        filterLocation={filterLocation}
                        setFilterLocation={setFilterLocation}
                        filterPriceRange={filterPriceRange}
                        setFilterPriceRange={setFilterPriceRange}
                    />
                )}

                {activeTab === 'bookings' && (
                    <BookingsView bookings={bookings} />
                )}
            </main>

            <ServiceDetailsModal
                service={selectedService}
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
                onConfirmBooking={handleConfirmBooking}
            />
        </div>
    );
};

export default UserDashboard;
