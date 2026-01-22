import { UserDto } from "../../auth/dtos/UserDto";
import { ServiceResponseDto } from "../../users/dtos/ServiceResponse.dto";

export interface BookingDTO {
  id: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  user?: UserDto;
  service?: ServiceResponseDto;
}
