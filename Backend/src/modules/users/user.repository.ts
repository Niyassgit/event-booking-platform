import { Service } from "@prisma/client";
import { IUserRepository } from "./interfaces/IUserRepository";
import { prisma } from "../../config/db";
import { BadRequestError } from "../../utils/errors";
import { errorMessages } from "../../utils/messages";

export class UserRepository implements IUserRepository {
  async getServices(filters: any): Promise<Service[]> {
    const { search, category, minPrice, maxPrice, location } = filters;
    const query: any = {};

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

  async createBooking(data: any): Promise<any> {
    return prisma.booking.create({
      data,
    });
  }

  async getUserBookings(userId: string): Promise<any[]> {
    return prisma.booking.findMany({
      where: { userId },
      include: { service: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async getServiceById(serviceId: string): Promise<Service | null> {
    return prisma.service.findUnique({
      where: { id: serviceId },
    });
  }
}
