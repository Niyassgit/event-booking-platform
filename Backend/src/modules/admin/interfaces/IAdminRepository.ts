import { User, Service, Booking } from "@prisma/client";

export interface IAdminRepository {
    findAllUsers(): Promise<User[]>;
    findUserById(userId: string): Promise<User | null>;
    findAllServices(filters?: Record<string, string | undefined>): Promise<Service[]>;
    findServiceById(serviceId: string): Promise<Service | null>;
    createService(data: Omit<Service, 'id' | 'createdAt' | 'bookings'>): Promise<Service>;
    updateService(serviceId: string, data: Partial<Omit<Service, 'id' | 'createdAt' | 'bookings'>>): Promise<Service>;
    deleteService(serviceId: string): Promise<void>;
    getAllBookings(filters?: Record<string, string | undefined>): Promise<(import("@prisma/client").Booking & { service: import("@prisma/client").Service, user: import("@prisma/client").User })[]>;
}