import { Service, Booking } from "@prisma/client";

export interface IUserRepository {
    getServices(filters: any): Promise<Service[]>;
    createBooking(data: any): Promise<Booking>;
    getUserBookings(userId: string): Promise<Booking[]>;
    getServiceById(serviceId: string): Promise<any | null>; // Changed to any to allow relations
    findOverlappingBookings(serviceId: string, startDate: Date, endDate: Date): Promise<Booking[]>;
}