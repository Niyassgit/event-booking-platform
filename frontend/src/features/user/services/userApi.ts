import { api } from "../../../services/api";
import type { Service, Booking } from "../types";

const CATEGORY_IMAGES: Record<string, string> = {
    // Backend categories (lowercase)
    venue:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1198&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    caterer:
        "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop",
    photographer:
        "https://images.unsplash.com/photo-1614196826634-1d6f9dedcddf?q=80&w=1169&auto=format&fit=crop",
    dj: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1170&auto=format&fit=crop",
    decoration:
        "https://plus.unsplash.com/premium_photo-1664790560155-eeef67a1e77c?q=80&w=687&auto=format&fit=crop",

    // Fallbacks just in case
    catering:
        "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop",
    photography:
        "https://images.unsplash.com/photo-1614196826634-1d6f9dedcddf?q=80&w=1169&auto=format&fit=crop",
    music:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1170&auto=format&fit=crop",
    decor:
        "https://plus.unsplash.com/premium_photo-1664790560155-eeef67a1e77c?q=80&w=687&auto=format&fit=crop",

    default:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
};

const getCategoryImage = (category: string): string => {
    return CATEGORY_IMAGES[category?.toLowerCase()] || CATEGORY_IMAGES["default"];
};

export const fetchServices = async (
    filters: Record<string, unknown>
): Promise<Service[]> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "All") params.append(key, String(value));
    });

    const response = await api.get(`/user/services?${params.toString()}`);
    return response.data.data.map(
        (s: {
            id: string;
            title: string;
            category: string;
            description: string;
            pricePerDay: number;
            location: string;
        }) => ({
            id: s.id,
            name: s.title,
            category: s.category,
            description: s.description,
            price: s.pricePerDay,
            location: s.location,
            rating: 4.8,
            image: getCategoryImage(s.category),
            capacity: "Varies",
            availableDates: [],
        })
    );
};

export const fetchServiceById = async (
    serviceId: string
): Promise<Service> => {
    const response = await api.get(`/user/service/${serviceId}`);
    const s = response.data.data;
    return {
        id: s.id,
        name: s.title,
        category: s.category,
        description: s.description,
        price: s.pricePerDay,
        location: s.location,
        rating: 4.8,
        image: getCategoryImage(s.category),
        capacity: "Varies",
        availableDates: [],
    };
};

export const fetchUserBookings = async (): Promise<Booking[]> => {
    const response = await api.get("/user/bookings");
    return response.data.data.map(
        (b: {
            id: string;
            service: { title: string; category?: string };
            startDate: string;
            totalPrice: number;
        }) => ({
            id: b.id,
            serviceName: b.service.title,
            date: new Date(b.startDate).toISOString().split("T")[0],
            status: "confirmed",
            price: b.totalPrice,
            image: getCategoryImage(b.service.category || "default"),
        })
    );
};

export const createBooking = async (
    serviceId: string,
    date: string
): Promise<void> => {
    await api.post(`/user/service/${serviceId}`, { date });
};
