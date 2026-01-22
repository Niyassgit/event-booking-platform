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

  async findAllServices(filters?: Record<string, string | undefined>): Promise<Service[]> {
    const { category, minPrice, maxPrice, startDate, endDate, searchTerm } = filters || {};
    const query: any = {};

    if (category && category !== 'All') {
      query.category = { equals: category, mode: 'insensitive' };
    }

    if (minPrice || maxPrice) {
      query.pricePerDay = {};
      if (minPrice) query.pricePerDay.gte = parseFloat(minPrice);
      if (maxPrice) query.pricePerDay.lte = parseFloat(maxPrice);
    }

    if (startDate) {
      query.availableFrom = { lte: new Date(startDate) };
    }
    if (endDate) {
      query.availableTo = { gte: new Date(endDate) };
    }

    if (searchTerm) {
      query.OR = [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    return prisma.service.findMany({
      where: query,
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

  async getAllBookings(filters?: Record<string, string | undefined>): Promise<(import("@prisma/client").Booking & { service: import("@prisma/client").Service, user: import("@prisma/client").User })[]> {
    const { category, minPrice, maxPrice, startDate, endDate, searchTerm } = filters || {};
    const query: any = {};

    if (category && category !== 'All') {
      query.service = {
        category: { equals: category, mode: 'insensitive' }
      };
    }

    if (minPrice || maxPrice) {
      query.totalPrice = {};
      if (minPrice) query.totalPrice.gte = parseFloat(minPrice);
      if (maxPrice) query.totalPrice.lte = parseFloat(maxPrice);
    }

    if (startDate || endDate) {
      query.startDate = {};
      if (startDate) {
        const sDate = new Date(startDate);
        sDate.setHours(0, 0, 0, 0);
        query.startDate.gte = sDate;
      }
      if (endDate) {
        const eDate = new Date(endDate);
        eDate.setHours(23, 59, 59, 999);
        query.startDate.lte = eDate;
      }
    }

    if (searchTerm) {
      query.service = {
        ...(query.service || {}),
        title: { contains: searchTerm, mode: 'insensitive' }
      };
    }

    return prisma.booking.findMany({
      where: query,
      include: {
        service: true,
        user: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }
}
