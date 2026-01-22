import { ServiceResponseDto } from "../dtos/ServiceResponse.dto";
import { BookingResponseDto } from "../dtos/BookingResponse.dto";

export interface IUserService {
    getAllServices(filters: any): Promise<ServiceResponseDto[]>;
    getServiceById(serviceId: string): Promise<ServiceResponseDto>;
    bookService(userId: string, serviceId: string, date: string): Promise<string>;
    getUserBookings(userId: string): Promise<BookingResponseDto[]>;
}
