export const CATEGORIES = ["All", "Venue", "Caterer", "Photographer", "DJ", "Decoration"];

export interface Service {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    location: string;
    rating: number;
    image: string;
    capacity: string;
    availableDates?: string[]; // Deprecated or kept for listing explicit dates
    availableFrom?: string;
    availableTo?: string;
    bookedDates?: string[];
}

export interface Booking {
    id: string;
    serviceName: string;
    date: string;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    price: number;
    image: string;
}
