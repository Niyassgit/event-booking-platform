import { prisma } from "../../config/db";
import { IAuthRepository } from "./interfaces/IAuthRepository";
import { RegisterUserDTO } from "./auth.types";
import { User } from "@prisma/client";

export class AuthRepository implements IAuthRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: RegisterUserDTO): Promise<User> {
    return prisma.user.create({
      data,
    });
  }
}
