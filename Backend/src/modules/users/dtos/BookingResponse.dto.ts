import { ServiceResponseDto } from "./ServiceResponse.dto";

export interface BookingResponseDto {
    id: string;
    userId: string;
    serviceId: string;
    date: Date;
    status: string;
    service?: ServiceResponseDto;
}
