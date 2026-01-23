import { ServiceResponseDto } from "../dtos/ServiceResponse.dto";
import { BookingResponseDto } from "../dtos/BookingResponse.dto";

export interface IUserService {
    getAllServices(filters: { search?: string; category?: string; minPrice?: string; maxPrice?: string; location?: string }): Promise<ServiceResponseDto[]>;
    getServiceMetadata(): Promise<{ maxPrice: number }>;
    getServiceById(serviceId: string): Promise<ServiceResponseDto>;
    bookService(userId: string, serviceId: string, date: string): Promise<string>;
    getUserBookings(userId: string): Promise<BookingResponseDto[]>;
}
