import { Service, Booking } from "@prisma/client";

export interface IUserRepository {
    getServices(filters: { search?: string; category?: string; minPrice?: string; maxPrice?: string; location?: string }): Promise<Service[]>;
    getMaxPrice(): Promise<number>;
    createBooking(data: Omit<Booking, 'id' | 'createdAt'>): Promise<Booking>;
    getUserBookings(userId: string): Promise<(Booking & { service: Service })[]>;
    getServiceById(serviceId: string): Promise<(Service & { bookings: Booking[] }) | null>;
    findOverlappingBookings(serviceId: string, startDate: Date, endDate: Date): Promise<Booking[]>;
}