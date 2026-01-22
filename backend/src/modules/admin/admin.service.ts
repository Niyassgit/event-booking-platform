import { IAdminRepository } from "./interfaces/IAdminRepository";
import { IAdminService } from "./interfaces/IAdminService";
import { NotFoundError } from "../../utils/errors";
import { errorMessages, successMessages } from "../../utils/messages";
import { Service } from "@prisma/client";
import { UserDto } from "../auth/dtos/UserDto";
import { AuthMapper } from "../auth/mappers/AuthMapper";
import { AdminMapper } from "./mappers/AdminMapper";
import { BookingDTO } from "./dtos/BookingDTO";
import { PaginatedResponseDto } from "./dtos/PaginatedResponse.dto";

export class AdminService implements IAdminService {
  private adminRepository: IAdminRepository;

  constructor(adminRepository: IAdminRepository) {
    this.adminRepository = adminRepository;
  }

  private calculatePaginationMeta(total: number, page: number, limit: number) {
    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async listAllUsers(
    filters?: Record<string, string | undefined>,
  ): Promise<PaginatedResponseDto<UserDto>> {
    const page = parseInt(filters?.page || "1");
    const limit = parseInt(filters?.limit || "10");

    const { data, total } = await this.adminRepository.findAllUsers(filters);

    return {
      data: data.map((user) => AuthMapper.userTODomain(user)),
      meta: this.calculatePaginationMeta(total, page, limit),
    };
  }

  async findUserById(id: string) {
    const user = await this.adminRepository.findUserById(id);
    if (!user) {
      throw new NotFoundError(errorMessages.USER_NOT_FOUND);
    }
    return AuthMapper.userTODomain(user);
  }

  async listAllServices(filters?: Record<string, string | undefined>) {
    const page = parseInt(filters?.page || "1");
    const limit = parseInt(filters?.limit || "10");

    const { data, total } = await this.adminRepository.findAllServices(filters);

    return {
      data: data.map((service) => AdminMapper.toServiceResponse(service)),
      meta: this.calculatePaginationMeta(total, page, limit),
    };
  }

  async findServiceById(id: string) {
    const service = await this.adminRepository.findServiceById(id);
    if (!service) {
      throw new NotFoundError("Service not found!");
    }
    return AdminMapper.toServiceResponse(service);
  }

  async createService(data: Omit<Service, "id" | "createdAt" | "bookings">) {
    const service = await this.adminRepository.createService(data);
    return AdminMapper.toServiceResponse(service);
  }

  async updateService(
    id: string,
    data: Partial<Omit<Service, "id" | "createdAt" | "bookings">>,
  ) {
    const service = await this.adminRepository.findServiceById(id);
    if (!service) {
      throw new NotFoundError("Service not found!");
    }
    const updated = await this.adminRepository.updateService(id, data);
    return AdminMapper.toServiceResponse(updated);
  }

  async deleteService(id: string) {
    const service = await this.adminRepository.findServiceById(id);
    if (!service) {
      throw new NotFoundError("Service not found!");
    }
    await this.adminRepository.deleteService(id);
    return successMessages.SERVICE_DELETE;
  }

  async getAllBookings(
    filters: Record<string, string | undefined>,
  ): Promise<PaginatedResponseDto<BookingDTO>> {
    const page = parseInt(filters?.page || "1");
    const limit = parseInt(filters?.limit || "10");

    const { data, total } = await this.adminRepository.getAllBookings(filters);

    return {
      data: data.map((booking) => AdminMapper.toBookingDTO(booking)),
      meta: this.calculatePaginationMeta(total, page, limit),
    };
  }
}
