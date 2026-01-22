import { Service, Booking, Prisma } from "@prisma/client";
import { IUserRepository } from "./interfaces/IUserRepository";
import { prisma } from "../../config/db";

export class UserRepository implements IUserRepository {
  async getServices(filters: {
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    location?: string;
  }): Promise<Service[]> {
    const { search, category, minPrice, maxPrice, location } = filters;
    const query: Prisma.ServiceWhereInput = {};

    if (search) {
      query.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    if (category && category !== "All") {
      query.category = { equals: category, mode: "insensitive" };
    }
    if (location) {
      query.location = { contains: location, mode: "insensitive" };
    }
    if (minPrice || maxPrice) {
      query.pricePerDay = {};
      if (minPrice) query.pricePerDay.gte = parseFloat(minPrice);
      if (maxPrice) query.pricePerDay.lte = parseFloat(maxPrice);
    }

    return prisma.service.findMany({
      where: query,
      orderBy: { createdAt: "desc" },
    });
  }

  async createBooking(
    data: Omit<Booking, "id" | "createdAt">,
  ): Promise<Booking> {
    return prisma.booking.create({
      data,
    });
  }

  async getUserBookings(
    userId: string,
  ): Promise<(Booking & { service: Service })[]> {
    return prisma.booking.findMany({
      where: { userId },
      include: { service: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async getServiceById(
    serviceId: string,
  ): Promise<(Service & { bookings: Booking[] }) | null> {
    return prisma.service.findUnique({
      where: { id: serviceId },
      include: { bookings: true },
    });
  }

  async findOverlappingBookings(
    serviceId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Booking[]> {
    return prisma.booking.findMany({
      where: {
        serviceId,
        startDate: { lt: endDate },
        endDate: { gt: startDate },
      },
    });
  }
}
