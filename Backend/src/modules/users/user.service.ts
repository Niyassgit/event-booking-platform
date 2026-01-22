import { IUserService } from "./interfaces/IUserService";
import { IUserRepository } from "./interfaces/IUserRepository";
import {
  NotFoundError,
  BadRequestError,
  ConflictError,
} from "../../utils/errors";
import { errorMessages, successMessages } from "../../utils/messages";
import { UserMapper } from "./mappers/user.mapper";
import { ServiceResponseDto } from "./dtos/ServiceResponse.dto";
import { BookingResponseDto } from "./dtos/BookingResponse.dto";

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) { }

  async getAllServices(filters: { search?: string; category?: string; minPrice?: string; maxPrice?: string; location?: string }): Promise<ServiceResponseDto[]> {
    const services = await this.userRepository.getServices(filters);
    return services.map((service) => UserMapper.toServiceResponse(service));
  }

  async getServiceById(serviceId: string): Promise<ServiceResponseDto> {
    const service = await this.userRepository.getServiceById(serviceId);
    if (!service) {
      throw new NotFoundError(errorMessages.SERVICE_NOT_FOIUND);
    }
    return UserMapper.toServiceResponse(service);
  }

  async bookService(
    userId: string,
    serviceId: string,
    date: string,
  ): Promise<string> {
    const service = await this.userRepository.getServiceById(serviceId);
    if (!service) {
      throw new NotFoundError(errorMessages.SERVICE_NOT_FOIUND);
    }

    const bookingDate = new Date(date);
    const startDate = new Date(bookingDate);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(bookingDate);
    endDate.setHours(23, 59, 59, 999);

    if (
      service.availableFrom &&
      bookingDate < new Date(service.availableFrom)
    ) {
      throw new BadRequestError(errorMessages.DATE_BEFORE_AVAILABLE);
    }
    if (service.availableTo && bookingDate > new Date(service.availableTo)) {
      throw new BadRequestError(errorMessages.DATE_OUT_OF_RANGE);
    }

    const overlappingBookings =
      await this.userRepository.findOverlappingBookings(
        serviceId,
        startDate,
        endDate,
      );
    if (overlappingBookings.length > 0) {
      throw new ConflictError("This date is already booked");
    }
    const totalPrice = service.pricePerDay || 0;

    await this.userRepository.createBooking({
      userId,
      serviceId,
      startDate,
      endDate,
      totalPrice,
    });

    return successMessages.SERVICE_BOOKED;
  }

  async getUserBookings(userId: string): Promise<BookingResponseDto[]> {
    const bookings = await this.userRepository.getUserBookings(userId);
    return bookings.map((booking) => UserMapper.toBookingResponse(booking));
  }
}
