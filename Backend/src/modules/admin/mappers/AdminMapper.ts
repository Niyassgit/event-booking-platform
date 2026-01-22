import { Service, Booking, User } from "@prisma/client";
import { BookingDTO } from "../dtos/BookingDTO";
import { UserMapper } from "../../users/mappers/user.mapper";
import { AuthMapper } from "../../auth/mappers/AuthMapper";
import { ServiceResponseDto } from "../../users/dtos/ServiceResponse.dto";

export class AdminMapper {
    static toBookingDTO(booking: Booking & { user?: User, service?: Service }): BookingDTO {
        return {
            id: booking.id,
            startDate: booking.startDate,
            endDate: booking.endDate,
            totalPrice: booking.totalPrice || 0,
            user: booking.user ? AuthMapper.userTODomain(booking.user) : undefined,
            service: booking.service ? UserMapper.toServiceResponse(booking.service) : undefined,
        };
    }

    static toServiceResponse(service: Service): ServiceResponseDto {
        return UserMapper.toServiceResponse(service);
    }
}
