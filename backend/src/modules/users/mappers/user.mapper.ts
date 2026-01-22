import { ServiceResponseDto } from "../dtos/ServiceResponse.dto";
import { BookingResponseDto } from "../dtos/BookingResponse.dto";
import { Service, Booking } from "@prisma/client";

export class UserMapper {
    static toServiceResponse(service: Service & { bookings?: Booking[] }): ServiceResponseDto {
        return {
            id: service.id,
            title: service.title,
            description: service.description,
            category: service.category,
            price: service.pricePerDay,
            location: service.location,
            availability: true,
            availableFrom: service.availableFrom,
            availableTo: service.availableTo,
            contactDetails: service.contactDetails,
            bookings: service.bookings?.map(booking => ({
                id: booking.id,
                startDate: booking.startDate,
                endDate: booking.endDate,
                userId: booking.userId,
                serviceId: booking.serviceId,
                createdAt: booking.createdAt,
            })),
        };
    }

    static toBookingResponse(booking: Booking & { service?: Service }): BookingResponseDto {
        return {
            id: booking.id,
            userId: booking.userId,
            date: booking.startDate, // Use booking date (startDate) instead of creation date
            status: 'confirmed',
            service: booking.service ? UserMapper.toServiceResponse(booking.service) : undefined,
        };
    }
}
