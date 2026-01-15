import { errorMessages, successMessages } from "../../utils/messages";
import { IUserRepository } from "./interfaces/IUserRepository";
import { BadRequestError } from "../../utils/errors";

export class UserService {
  constructor(private userRepository: IUserRepository) { }

  async getAllServices(filters: any) {
    const services = await this.userRepository.getServices(filters);
    return services || [];
  }

  async getServiceById(serviceId: string) {
    const service = await this.userRepository.getServiceById(serviceId);
    if (!service) {
      throw new BadRequestError(errorMessages.SERVICE_NOT_FOIUND);
    }
    return service;
  }

  async bookService(userId: string, serviceId: string, startDate: string, endDate?: string) {
    const service = await this.userRepository.getServiceById(serviceId);
    if (!service) {
      throw new BadRequestError(errorMessages.SERVICE_NOT_FOIUND);
    }

    // Default to 1 day if endDate not provided
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date(start);

    // Validate availability range
    if (start < new Date(service.availableFrom) || end > new Date(service.availableTo)) {
      throw new BadRequestError(errorMessages.DATE_OUT_OF_RANGE);
    }

    // Check for overlaps
    const overlaps = await this.userRepository.findOverlappingBookings(serviceId, start, end);
    if (overlaps.length > 0) {
      throw new BadRequestError(errorMessages.DATE_ALREADY_BOOKED);
    }

    // Calculate days difference
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include start date

    const totalPrice = service.pricePerDay * diffDays;

    const booking = await this.userRepository.createBooking({
      userId,
      serviceId,
      startDate: start,
      endDate: end,
      totalPrice,
    });

    return booking ? successMessages.SERVICE_BOOKED : errorMessages.BOOKING_FAILED;
  }

  async getUserBookings(userId: string) {
    return await this.userRepository.getUserBookings(userId);
  }
}
