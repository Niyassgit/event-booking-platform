import { User, Service } from "@prisma/client";

export interface IAdminRepository {
    findAllUsers(): Promise<User[]>;
    findUserById(userId: string): Promise<User | null>;
    // updateUserStatus(userId:string,isBlocked:boolean):Promise<User>;
    findAllServices(): Promise<Service[]>;
    findServiceById(serviceId: string): Promise<Service | null>;
    createService(data: Omit<Service, 'id' | 'createdAt' | 'bookings'>): Promise<Service>;
    updateService(serviceId: string, data: Partial<Omit<Service, 'id' | 'createdAt' | 'bookings'>>): Promise<Service>;
    deleteService(serviceId: string): Promise<void>;
    getAllBookings(filters?: any): Promise<any[]>;
}