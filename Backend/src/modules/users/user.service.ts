import { IUserService } from "./interfaces/IUserService";
import { IUserRepository } from "./interfaces/IUserRepository";
import { NotFoundError } from "../../utils/errors";
import { errorMessages } from "../../utils/messages";

export class UserService implements IUserService {
    constructor(private userRepository: IUserRepository) { }

    async getAllServices(filters: any): Promise<any[]> {
        return this.userRepository.getServices(filters);
    }

    async getServiceById(serviceId: string): Promise<any> {
        const service = await this.userRepository.getServiceById(serviceId);
        if (!service) {
            throw new NotFoundError(errorMessages.SERVICE_NOT_FOIUND);
        }
        return service;
    }

    async bookService(userId: string, serviceId: string, date: string): Promise<string> {
        // 1. Check if service exists
        const service = await this.userRepository.getServiceById(serviceId);
        if (!service) {
            throw new NotFoundError(errorMessages.SERVICE_NOT_FOIUND);
        }

        // 2. Create Booking
        const bookingDate = new Date(date);

        await this.userRepository.createBooking({
            userId,
            serviceId,
            date: bookingDate,
            status: 'pending' // Default status
        });

        return "Service booked successfully";
    }

    async getUserBookings(userId: string): Promise<any[]> {
        return this.userRepository.getUserBookings(userId);
    }
}
