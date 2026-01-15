import { useState, useEffect } from "react";
import ServicesList from "../components/ServicesList";
import ServiceModal from "../components/ServiceModal";
import { getAllServices, createService, updateService, deleteService } from "../services/api";
import type { Service } from "../../../types";
import toast from "react-hot-toast";

const AdminDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(false);

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
        <div className="p-8">
            {loading ? (
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
            )}

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
