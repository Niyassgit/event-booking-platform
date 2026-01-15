import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../auth/authSlice";
import type { RootState } from "../../../app/store";
import type { Service, Booking } from "../types";
import {
  fetchServices,
  fetchUserBookings,
  createBooking,
} from "../services/userApi";
import DashboardNavbar from "../components/DashboardNavbar";
import ServicesView from "../components/ServicesView";
import BookingsView from "../components/BookingsView";
import ServiceDetailsModal from "../components/ServiceDetailsModal";
import toast from "react-hot-toast";
import Footer from "../../auth/pages/Footer";

const UserDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [activeTab, setActiveTab] = useState<"services" | "bookings">(
    "services"
  );
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterPriceRange, setFilterPriceRange] = useState<[number, number]>([
    0, 100000,
  ]);

  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const loadServices = async () => {
      try {
        const filters = {
          search: searchTerm,
          category: filterCategory,
          location: filterLocation,
          minPrice: filterPriceRange[0],
          maxPrice: filterPriceRange[1],
        };
        const data = await fetchServices(filters);
        setServices(data);
      } catch (error) {
        console.error("Failed to load services", error);
        toast.error("Failed to load services");
      }
    };
    loadServices();
  }, [searchTerm, filterCategory, filterLocation, filterPriceRange]);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchUserBookings();
        setBookings(data);
      } catch (error) {
        console.error("Failed to load bookings", error);
      }
    };

    if (activeTab === "bookings") {
      loadBookings();
    }
  }, [activeTab]);

  const handleConfirmBooking = async (service: Service, date: string) => {
    try {
      await createBooking(service.id, date);
      toast.success(`Booking confirmed for ${service.name} on ${date}!`);
      setSelectedService(null);
      setActiveTab("bookings");
      // loadBookings will be called by useEffect when tab changes
    } catch (error) {
      toast.error("Booking failed. Please try again.");
      console.error(error);
    }
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
            {activeTab === "services"
              ? "Find Your Perfect Service"
              : "Your Bookings"}
          </h1>
          <p className="text-slate-400 max-w-2xl">
            {activeTab === "services"
              ? "Discover top-rated venues, caterers, and photographers for your next big event."
              : "Manage your past and upcoming event reservations."}
          </p>
        </header>

        {activeTab === "services" && (
          <ServicesView
            filteredServices={services}
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

        {activeTab === "bookings" && <BookingsView bookings={bookings} />}
      </main>

      <ServiceDetailsModal
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        onConfirmBooking={handleConfirmBooking}
      />

      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default UserDashboard;
