import { IAdminRepository } from "./interfaces/IAdminRepository";
import { IAdminService } from "./interfaces/IAdminService";
import { NotFoundError } from "../../utils/errors";
import { errorMessages, successMessages } from "../../utils/messages";
import { Service } from "@prisma/client";
import { UserDto } from "../auth/dtos/UserDto";
import { AuthMapper } from "../auth/mappers/AuthMapper";
import { AdminMapper } from "./mappers/AdminMapper";
import { BookingDTO } from "./dtos/BookingDTO";

export class AdminService implements IAdminService {
  private adminRepository: IAdminRepository;

  constructor(adminRepository: IAdminRepository) {
    this.adminRepository = adminRepository;
  }

  async listAllUsers(): Promise<UserDto[]> {
    const users = await this.adminRepository.findAllUsers();
    return users.map((user) => AuthMapper.userTODomain(user));
  }

  async findUserById(id: string) {
    const user = await this.adminRepository.findUserById(id);
    if (!user) {
      throw new NotFoundError(errorMessages.USER_NOT_FOUND);
    }
    return AuthMapper.userTODomain(user);
  }

  async listAllServices(filters?: Record<string, string | undefined>) {
    const services = await this.adminRepository.findAllServices(filters);
    return services.map((service) => AdminMapper.toServiceResponse(service));
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
    // Assuming deleteService is void or similar, just call it
    await this.adminRepository.deleteService(id);
    return successMessages.SERVICE_DELETE;
  }

  async getAllBookings(filters: Record<string, string | undefined>): Promise<BookingDTO[]> {
    const bookings = await this.adminRepository.getAllBookings(filters);
    return bookings.map((booking) => AdminMapper.toBookingDTO(booking));
  }
}
