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
import Footer from "../../auth/pages/Footer";

const UserDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");
    const [filterLocation, setFilterLocation] = useState("");
    const [filterPriceRange, setFilterPriceRange] = useState<[number, number]>([
        0, 100000,
    ]);

    const [allServices, setAllServices] = useState<Service[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    // Fetch all services once on mount
    useEffect(() => {
        const loadAllServices = async () => {
            try {
                const data = await fetchServices({});
                setAllServices(data);
                setServices(data);
            } catch (error) {
                console.error("Failed to load services", error);
                toast.error("Failed to load services");
            }
        };
        loadAllServices();
    }, []);

    // Filter services locally whenever filters change
    useEffect(() => {
        let result = allServices;

        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(
                (s) =>
                    s.name.toLowerCase().includes(lowerTerm) ||
                    s.description.toLowerCase().includes(lowerTerm)
            );
        }

        if (filterCategory && filterCategory !== "All") {
            result = result.filter(
                (s) => s.category.toLowerCase() === filterCategory.toLowerCase()
            );
        }

        if (filterLocation) {
            const lowerLoc = filterLocation.toLowerCase();
            result = result.filter((s) => s.location.toLowerCase().includes(lowerLoc));
        }

        if (filterPriceRange[0] > 0 || filterPriceRange[1] < 100000) {
            result = result.filter(
                (s) => s.price >= filterPriceRange[0] && s.price <= filterPriceRange[1]
            );
        }

        setServices(result);
    }, [allServices, searchTerm, filterCategory, filterLocation, filterPriceRange]);

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
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterCategory={filterCategory}
                    setFilterCategory={setFilterCategory}
                    filterLocation={filterLocation}
                    setFilterLocation={setFilterLocation}
                    filterPriceRange={filterPriceRange}
                    setFilterPriceRange={setFilterPriceRange}
                />
            </main>

            <ServiceDetailsModal
                service={selectedService}
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
                onConfirmBooking={handleConfirmBooking}
            />

            {/* <div className="mt-10">
        <Footer />
      </div> */}
        </div>
    );
};

export default UserDashboard;
