import { IAdminRepository } from "./interfaces/IAdminRepository";
import { NotFoundError } from "../../utils/errors";
import { errorMessages } from "../../utils/messages";
import { Service } from "@prisma/client";

export class AdminService {
  private adminRepository: IAdminRepository;

  constructor(adminRepository: IAdminRepository) {
    this.adminRepository = adminRepository;
  }

  async listAllUsers() {
    const users = await this.adminRepository.findAllUsers();
    return users || [];
  }

  async findUserById(id: string) {
    const user = await this.adminRepository.findUserById(id);
    if (!user) {
      throw new NotFoundError(errorMessages.USER_NOT_FOUND);
    }
    return user;
  }

  async listAllServices() {
    const services = await this.adminRepository.findAllServices();
    return services || [];
  }

  async findServiceById(id: string) {
    const service = await this.adminRepository.findServiceById(id);
    if (!service) {
      throw new NotFoundError("Service not found!");
    }
    return service;
  }

  async createService(data: Omit<Service, 'id' | 'createdAt' | 'bookings'>) {
    return this.adminRepository.createService(data);
  }

  async updateService(id: string, data: Partial<Omit<Service, 'id' | 'createdAt' | 'bookings'>>) {
    const service = await this.adminRepository.findServiceById(id);
    if (!service) {
      throw new NotFoundError("Service not found!");
    }
    return this.adminRepository.updateService(id, data);
  }

  async deleteService(id: string) {
    const service = await this.adminRepository.findServiceById(id);
    if (!service) {
      throw new NotFoundError("Service not found!");
    }
    await this.adminRepository.deleteService(id);
  }
}
