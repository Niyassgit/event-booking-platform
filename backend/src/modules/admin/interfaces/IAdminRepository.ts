import { User, Service, Booking } from "@prisma/client";

export interface IAdminRepository {
    findAllUsers(filters?: Record<string, string | undefined>): Promise<{ data: User[], total: number }>;
    findUserById(userId: string): Promise<User | null>;
    findAllServices(filters?: Record<string, string | undefined>): Promise<{ data: Service[], total: number }>;
    findServiceById(serviceId: string): Promise<Service | null>;
    createService(data: Omit<Service, 'id' | 'createdAt' | 'bookings'>): Promise<Service>;
    updateService(serviceId: string, data: Partial<Omit<Service, 'id' | 'createdAt' | 'bookings'>>): Promise<Service>;
    deleteService(serviceId: string): Promise<void>;
    getAllBookings(filters?: Record<string, string | undefined>): Promise<{ data: (Booking & { service: Service, user: User })[], total: number }>;
}