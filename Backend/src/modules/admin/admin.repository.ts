import { User, Service, Booking, Prisma } from "@prisma/client";
import { IAdminRepository } from "./interfaces/IAdminRepository";
import { prisma } from "../../config/db";

export class AdminRepository implements IAdminRepository {
  async findAllUsers(filters?: Record<string, string | undefined>): Promise<{ data: User[], total: number }> {
    const { searchTerm } = filters || {};
    const page = parseInt(filters?.page || '1');
    const limit = parseInt(filters?.limit || '10');
    const skip = (page - 1) * limit;

    const query: Prisma.UserWhereInput = {};

    if (searchTerm) {
      query.OR = [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { email: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      prisma.user.findMany({
        where: query,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where: query })
    ]);

    return { data, total };
  }

  async findUserById(userId: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id: userId } });
  }

  async findAllServices(filters?: Record<string, string | undefined>): Promise<{ data: Service[], total: number }> {
    const { category, minPrice, maxPrice, startDate, endDate, searchTerm } = filters || {};
    const page = parseInt(filters?.page || '1');
    const limit = parseInt(filters?.limit || '10');
    const skip = (page - 1) * limit;

    const query: Prisma.ServiceWhereInput = {};

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

    const [data, total] = await Promise.all([
      prisma.service.findMany({
        where: query,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.service.count({ where: query })
    ]);

    return { data, total };
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

  async getAllBookings(filters?: Record<string, string | undefined>): Promise<{ data: (Booking & { service: Service, user: User })[], total: number }> {
    const { category, minPrice, maxPrice, startDate, endDate, searchTerm } = filters || {};
    const page = parseInt(filters?.page || '1');
    const limit = parseInt(filters?.limit || '10');
    const skip = (page - 1) * limit;

    const query: Prisma.BookingWhereInput = {};

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
        ...(query.service as Prisma.ServiceWhereInput || {}),
        title: { contains: searchTerm, mode: 'insensitive' }
      };
    }

    const [data, total] = await Promise.all([
      prisma.booking.findMany({
        where: query,
        include: {
          service: true,
          user: true
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.booking.count({ where: query })
    ]);

    return { data, total };
  }
}
