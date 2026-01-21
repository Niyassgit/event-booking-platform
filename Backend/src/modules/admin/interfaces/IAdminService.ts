import { Service } from "@prisma/client";

export interface IAdminService {
    listAllUsers(): Promise<any[]>;
    findUserById(id: string): Promise<any>;
    listAllServices(): Promise<any[]>;
    findServiceById(id: string): Promise<any>;
    createService(data: Omit<Service, 'id' | 'createdAt' | 'bookings'>): Promise<any>;
    updateService(id: string, data: Partial<Omit<Service, 'id' | 'createdAt' | 'bookings'>>): Promise<any>;
    deleteService(id: string): Promise<void>;
    getAllBookings(filters: any): Promise<any>;
}
