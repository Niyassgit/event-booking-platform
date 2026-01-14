import { Service } from "@prisma/client";
import { IUserRepository } from "./interfaces/IUserRepository";
import { prisma } from "../../config/db";
import { BadRequestError } from "../../utils/errors";
import { errorMessages } from "../../utils/messages";

export class UserRepository implements IUserRepository {
  async BookService(serviceId: string): Promise<boolean> {
    const date = new Date();
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });
    if (!service) throw new BadRequestError(errorMessages.SERVICE_NOT_FOIUND);
    const updated = await prisma.service.update({
      where: { id: service.id },
      data: {},
    });
    return !!updated;
  }
  async getServices(): Promise<Service[]> {
    return prisma.service.findMany();
  }
}
