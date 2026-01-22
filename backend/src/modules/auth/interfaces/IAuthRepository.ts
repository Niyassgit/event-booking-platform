import { User } from "@prisma/client";
import { RegisterUserDTO } from "../auth.types";

export interface IAuthRepository {
    findUserByEmail(email: string): Promise<User | null>;
    createUser(data: RegisterUserDTO): Promise<User>;
}
