import { User } from "@prisma/client";
import { IAdminRepository } from "./interfaces/IAdminRepository";
import { prisma } from "../../config/db";

export class AdminRepository implements IAdminRepository {
  async findAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }
  async findUserById(userId: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id: userId } });
  }
}
