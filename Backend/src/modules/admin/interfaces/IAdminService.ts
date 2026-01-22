import { Service } from "@prisma/client";
import { UserDto } from "../../auth/dtos/UserDto";
import { ServiceResponseDto } from "../../users/dtos/ServiceResponse.dto";
import { BookingDTO } from "../dtos/BookingDTO";

export interface IAdminService {
  listAllUsers(): Promise<UserDto[]>;
  findUserById(id: string): Promise<UserDto>;
  listAllServices(filters?: Record<string, string | undefined>): Promise<ServiceResponseDto[]>;
  findServiceById(id: string): Promise<ServiceResponseDto>;
  createService(
    data: Omit<Service, "id" | "createdAt" | "bookings">,
  ): Promise<ServiceResponseDto>;
  updateService(
    id: string,
    data: Partial<Omit<Service, "id" | "createdAt" | "bookings">>,
  ): Promise<ServiceResponseDto>;
  deleteService(id: string): Promise<string>;
  getAllBookings(filters: Record<string, string | undefined>): Promise<BookingDTO[]>;
}
