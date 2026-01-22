import { Service } from "@prisma/client";
import { UserDto } from "../../auth/dtos/UserDto";
import { ServiceResponseDto } from "../../users/dtos/ServiceResponse.dto";
import { BookingDTO } from "../dtos/BookingDTO";

import { PaginatedResponseDto } from "../dtos/PaginatedResponse.dto";

export interface IAdminService {
  listAllUsers(filters?: Record<string, string | undefined>): Promise<PaginatedResponseDto<UserDto>>;
  findUserById(id: string): Promise<UserDto>;
  listAllServices(filters?: Record<string, string | undefined>): Promise<PaginatedResponseDto<ServiceResponseDto>>;
  findServiceById(id: string): Promise<ServiceResponseDto>;
  createService(
    data: Omit<Service, "id" | "createdAt" | "bookings">,
  ): Promise<ServiceResponseDto>;
  updateService(
    id: string,
    data: Partial<Omit<Service, "id" | "createdAt" | "bookings">>,
  ): Promise<ServiceResponseDto>;
  deleteService(id: string): Promise<string>;
  getAllBookings(filters: Record<string, string | undefined>): Promise<PaginatedResponseDto<BookingDTO>>;
}
