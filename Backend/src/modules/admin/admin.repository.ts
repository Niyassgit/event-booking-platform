import { User, Service } from "@prisma/client";
import { IAdminRepository } from "./interfaces/IAdminRepository";
import { prisma } from "../../config/db";

export class AdminRepository implements IAdminRepository {
  async findAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }
  async findUserById(userId: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id: userId } });
  }

  async findAllServices(): Promise<Service[]> {
    return prisma.service.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async findServiceById(serviceId: string): Promise<Service | null> {
    return prisma.service.findUnique({ where: { id: serviceId } });
  }

  async createService(data: Omit<Service, 'id' | 'createdAt' | 'bookings'>): Promise<Service> {
    return prisma.service.create({ data });
  }

  async updateService(serviceId: string, data: Partial<Omit<Service, 'id' | 'createdAt' | 'bookings'>>): Promise<Service> {
    return prisma.service.update({
      where: { id: serviceId },
      data
    });
  }

  async deleteService(serviceId: string): Promise<void> {
    await prisma.service.delete({ where: { id: serviceId } });
  }

  async getAllBookings(filters?: any): Promise<any[]> {
    const { category, date } = filters || {};
    const query: any = {};

    if (category && category !== 'All') {
      query.service = {
        category: { equals: category, mode: 'insensitive' }
      };
    }

    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      query.startDate = {
        gte: startDate,
        lte: endDate
      };
    }

    return prisma.booking.findMany({
      where: query,
      include: {
        service: true,
        user: { select: { name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
