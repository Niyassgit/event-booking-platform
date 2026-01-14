import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { logout } from "../../auth/authSlice";
import AdminSidebar from "../components/AdminSidebar";
import ServicesList from "../components/ServicesList";
import BookingsList from "../components/BookingsList";
import ServiceModal from "../components/ServiceModal";
import { getAllServices, createService, updateService, deleteService } from "../services/api";
import type { Service, Booking } from "../../../types";
import toast from "react-hot-toast";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState<"services" | "bookings">("services");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(false);

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

    // Fetch services on mount
    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const response = await getAllServices();
            if (response.success && response.data) {
                // Format dates for display
                const formattedServices = response.data.map((service: any) => ({
                    ...service,
                    availableFrom: new Date(service.availableFrom).toISOString().split('T')[0],
                    availableTo: new Date(service.availableTo).toISOString().split('T')[0],
                }));
                setServices(formattedServices);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch services");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const handleDeleteService = async (id: string) => {
        if (confirm("Are you sure you want to delete this service?")) {
            try {
                await deleteService(id);
                setServices(services.filter((s) => s.id !== id));
                toast.success("Service deleted successfully");
            } catch (error: any) {
                toast.error(error?.response?.data?.message || "Failed to delete service");
            }
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

    const handleModalSubmit = async (data: Partial<Service>) => {
        try {
            if (editingService) {
                // Update service
                const response = await updateService(editingService.id, data);
                if (response.success && response.data) {
                    const updatedService = {
                        ...response.data,
                        availableFrom: new Date(response.data.availableFrom).toISOString().split('T')[0],
                        availableTo: new Date(response.data.availableTo).toISOString().split('T')[0],
                    };
                    setServices((prev) =>
                        prev.map((s) => (s.id === editingService.id ? updatedService : s))
                    );
                    toast.success("Service updated successfully");
                }
            } else {
                // Create service
                const response = await createService(data as Omit<Service, "id">);
                if (response.success && response.data) {
                    const newService = {
                        ...response.data,
                        availableFrom: new Date(response.data.availableFrom).toISOString().split('T')[0],
                        availableTo: new Date(response.data.availableTo).toISOString().split('T')[0],
                    };
                    setServices((prev) => [...prev, newService]);
                    toast.success("Service created successfully");
                }
            }
            setIsModalOpen(false);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to save service");
        }
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
                        loading ? (
                            <div className="flex items-center justify-center h-64">
                                <div className="text-slate-400">Loading services...</div>
                            </div>
                        ) : (
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
                        )
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
