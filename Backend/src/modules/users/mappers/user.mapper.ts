import { ServiceResponseDto } from "../dtos/ServiceResponse.dto";
import { BookingResponseDto } from "../dtos/BookingResponse.dto";

export class UserMapper {
    static toServiceResponse(service: any): ServiceResponseDto {
        return {
            id: service.id,
            title: service.title,
            description: service.description,
            category: service.category,
            price: service.pricePerDay || service.price, // Handle potential naming diff
            location: service.location,
            images: service.images || [],
            availability: service.availability ?? true, // Default to true if not present
        };
    }

    static toBookingResponse(booking: any): BookingResponseDto {
        return {
            id: booking.id,
            userId: booking.userId,
            serviceId: booking.serviceId,
            date: booking.date,
            status: booking.status,
            service: booking.service ? UserMapper.toServiceResponse(booking.service) : undefined,
        };
    }
}
