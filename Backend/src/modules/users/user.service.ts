import { IUserService } from "./interfaces/IUserService";
import { IUserRepository } from "./interfaces/IUserRepository";
import { NotFoundError } from "../../utils/errors";
import { errorMessages } from "../../utils/messages";
import { UserMapper } from "./mappers/user.mapper";
import { ServiceResponseDto } from "./dtos/ServiceResponse.dto";
import { BookingResponseDto } from "./dtos/BookingResponse.dto";

export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository) { }

    async getAllServices(filters: any): Promise<ServiceResponseDto[]> {
        const services = await this.userRepository.getServices(filters);
        return services.map(service => UserMapper.toServiceResponse(service));
    }

    async getServiceById(serviceId: string): Promise<ServiceResponseDto> {
        const service = await this.userRepository.getServiceById(serviceId);
        if (!service) {
            throw new NotFoundError(errorMessages.SERVICE_NOT_FOIUND);
        }
        return UserMapper.toServiceResponse(service);
    }

    async bookService(userId: string, serviceId: string, date: string): Promise<string> {
        // 1. Check if service exists
        const service = await this.userRepository.getServiceById(serviceId);
        if (!service) {
            throw new NotFoundError(errorMessages.SERVICE_NOT_FOIUND);
        }

        // 2. Create Booking
        // Ensure date is parsed correctly
        const bookingDate = new Date(date);

        await this.userRepository.createBooking({
            userId,
            serviceId,
            date: bookingDate,
            status: 'pending' // Default status
        });

        return "Service booked successfully";
    }

    async getUserBookings(userId: string): Promise<BookingResponseDto[]> {
        const bookings = await this.userRepository.getUserBookings(userId);
        return bookings.map(booking => UserMapper.toBookingResponse(booking));
    }
}
