import { ServiceResponseDto } from "./ServiceResponse.dto";

export interface BookingResponseDto {
    id: string;
    userId: string;
    date: Date;
    status: string;
    service?: ServiceResponseDto;
}
