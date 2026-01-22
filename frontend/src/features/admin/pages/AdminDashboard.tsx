import { useState, useEffect, useCallback } from "react";
import ServicesList from "../components/ServicesList";
import ServiceModal from "../components/ServiceModal";
import FilterBar from "../../../components/common/FilterBar";
import { getAllServices, createService, updateService, deleteService } from "../services/api";
import type { Service } from "../../../types";
import toast from "react-hot-toast";

const CATEGORIES = ["venue", "caterer", "dj", "photographer", "decoration"];

const AdminDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});

    const fetchServices = useCallback(async (filters: Record<string, any> = {}) => {
        try {
            setLoading(true);
            const response = await getAllServices(filters);
            if (response.success && response.data) {
                const formattedServices = response.data.map((service: any) => ({
                    ...service,
                    pricePerDay: service.price ?? service.pricePerDay ?? 0,
                    availableFrom: service.availableFrom
                        ? new Date(service.availableFrom).toISOString().split('T')[0]
                        : '',
                    availableTo: service.availableTo
                        ? new Date(service.availableTo).toISOString().split('T')[0]
                        : '',
                }));
                setServices(formattedServices);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to fetch services");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchServices(activeFilters);
    }, [fetchServices, activeFilters]);

    const handleFilterChange = (filters: any) => {
        setActiveFilters(filters);
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
                const response = await updateService(editingService.id, data);
                if (response.success && response.data) {
                    const updatedService = {
                        ...response.data,
                        pricePerDay: response.data.price ?? response.data.pricePerDay ?? 0,
                        availableFrom: response.data.availableFrom
                            ? new Date(response.data.availableFrom).toISOString().split('T')[0]
                            : '',
                        availableTo: response.data.availableTo
                            ? new Date(response.data.availableTo).toISOString().split('T')[0]
                            : '',
                    };
                    setServices((prev) =>
                        prev.map((s) => (s.id === editingService.id ? updatedService : s))
                    );
                    toast.success("Service updated successfully");
                }
            } else {
                const response = await createService(data as Omit<Service, "id">);
                if (response.success && response.data) {
                    const newService = {
                        ...response.data,
                        pricePerDay: response.data.price ?? response.data.pricePerDay ?? 0,
                        availableFrom: response.data.availableFrom
                            ? new Date(response.data.availableFrom).toISOString().split('T')[0]
                            : '',
                        availableTo: response.data.availableTo
                            ? new Date(response.data.availableTo).toISOString().split('T')[0]
                            : '',
                    };
                    setServices((prev) => [...prev, newService]);
                    toast.success("Service created successfully");
                }
            }
            setIsModalOpen(false);
            fetchServices(activeFilters); // Refresh list to ensure filters are applied correctly
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to save service");
        }
    };

    return (
        <div className="p-8">
            <FilterBar onFilter={handleFilterChange} categories={CATEGORIES} />

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="text-slate-400">Loading services...</div>
                </div>
            ) : (
                <ServicesList
                    services={services}
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
