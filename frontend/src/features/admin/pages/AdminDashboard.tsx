import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { logout } from "../../auth/authSlice";
import AdminSidebar from "../components/AdminSidebar";
import ServicesList from "../components/ServicesList";
import BookingsList from "../components/BookingsList";
import ServiceModal from "../components/ServiceModal";
import type { Service, Booking } from "../../../types";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState<"services" | "bookings">("services");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [editingService, setEditingService] = useState<Service | null>(null);

    // Mock Data
    const [services, setServices] = useState<Service[]>([
        {
            id: "1",
            title: "Royal Grand Hall",
            category: "venue",
            pricePerDay: 50000,
            description: "A luxurious hall for grand weddings, capacity 1000 guests.",
            location: "Mumbai, India",
            availableFrom: "2024-01-01",
            availableTo: "2024-12-31",
        },
        {
            id: "2",
            title: "DJ Snake Beats",
            category: "dj",
            pricePerDay: 15000,
            description: "Top rated DJ for party vibes.",
            location: "Delhi, India",
            availableFrom: "2024-02-01",
            availableTo: "2024-11-30",
        },
    ]);

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

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const handleDeleteService = (id: string) => {
        if (confirm("Are you sure you want to delete this service?")) {
            setServices(services.filter((s) => s.id !== id));
        }
    };

    const handleEditClick = (service: Service) => {
        setEditingService(service);
        setIsModalOpen(true);
    };

    const handleAddNewClick = () => {
        setEditingService(null);
        setIsModalOpen(true);
    };

    const handleModalSubmit = (data: Partial<Service>) => {
        if (editingService) {
            // Update logic (mock)
            setServices((prev) =>
                prev.map((s) => (s.id === editingService.id ? { ...s, ...data } as Service : s))
            );
        } else {
            // Create logic (mock)
            const newService = { ...data, id: Date.now().toString() } as Service;
            setServices((prev) => [...prev, newService]);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
            <AdminSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onLogout={handleLogout}
            />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-20">
                    <h1 className="text-xl font-semibold text-slate-200 capitalize">
                        {activeTab} Management
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-medium">
                            AD
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {activeTab === "services" && (
                        <ServicesList
                            services={services}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteService}
                            onAddNew={handleAddNewClick}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    )}

                    {activeTab === "bookings" && <BookingsList bookings={bookings} />}
                </div>
            </main>

            <ServiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                editingService={editingService}
            />
        </div>
    );
};

export default AdminDashboard;
