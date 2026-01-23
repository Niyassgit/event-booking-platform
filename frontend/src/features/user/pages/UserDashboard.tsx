import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../auth/authSlice";
import type { RootState } from "../../../app/store";
import type { Service } from "../types";
import { fetchServices, createBooking, fetchServiceById } from "../services/userApi";
import DashboardNavbar from "../components/DashboardNavbar";
import ServicesView from "../components/ServicesView";
import ServiceDetailsModal from "../components/ServiceDetailsModal";
import toast from "react-hot-toast";

const UserDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const [activeFilters, setActiveFilters] = useState({
        searchTerm: "",
        filterCategory: "All",
        filterLocation: "",
        filterPriceRange: [0, 100000] as [number, number]
    });

    const [maxPriceLimit, setMaxPriceLimit] = useState(100000);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    useEffect(() => {
        const loadServices = async () => {
            try {
                setLoading(true);
                const { services: data, maxPrice } = await fetchServices({
                    search: activeFilters.searchTerm,
                    category: activeFilters.filterCategory,
                    location: activeFilters.filterLocation,
                    minPrice: activeFilters.filterPriceRange[0].toString(),
                    maxPrice: activeFilters.filterPriceRange[1].toString(),
                });
                setServices(data);
                if (maxPrice > 0) setMaxPriceLimit(maxPrice);

            } catch (error) {
                console.error("Failed to load services", error);
                toast.error("Failed to load services");
            } finally {
                setLoading(false);
            }
        };
        loadServices();
    }, [activeFilters]);

    const handleApplyFilters = (filters: typeof activeFilters) => {
        setActiveFilters(filters);
    };

    const handleConfirmBooking = async (service: Service, date: string) => {
        try {
            await createBooking(service.id, date);
            toast.success(`Booking confirmed for ${service.name} on ${date}!`);
            setSelectedService(null);
            navigate("/user/bookings");
        } catch (error: any) {
            const msg = error?.response?.data?.message || "Booking failed. Please try again.";
            toast.error(msg);
            console.error(error);
        }
    };

    const handleBookClick = async (s: Service) => {
        try {
            const fullDetails = await fetchServiceById(s.id);
            setSelectedService(fullDetails);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load service details");
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-indigo-500/30">
            <DashboardNavbar
                user={user}
                activePage="services"
                onLogout={handleLogout}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Find Your Perfect Service
                    </h1>
                    <p className="text-slate-400 max-w-2xl">
                        Discover top-rated venues, caterers, and photographers for your next
                        big event.
                    </p>
                </header>

                <ServicesView
                    filteredServices={services}
                    onBook={handleBookClick}
                    activeFilters={activeFilters}
                    onApplyFilters={handleApplyFilters}
                    maxPriceLimit={maxPriceLimit}
                />

                {loading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
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
