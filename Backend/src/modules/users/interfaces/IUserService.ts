export interface IUserService {
    getAllServices(filters: any): Promise<any[]>;
    getServiceById(serviceId: string): Promise<any>;
    bookService(userId: string, serviceId: string, date: string): Promise<string>;
    getUserBookings(userId: string): Promise<any[]>;
}
