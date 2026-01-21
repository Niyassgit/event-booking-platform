import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IAuthRepository } from "./interfaces/IAuthRepository";
import { IAuthService } from "./interfaces/IAuthService";
import { env } from "../../config/env";
import { errorMessages } from "../../utils/messages";
import { BadRequestError } from "../../utils/errors";
import { LoginUserDTO, RegisterUserDTO } from "./auth.types";

export class AuthService implements IAuthService {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  async register(data: RegisterUserDTO) {
    const { name, email, password } = data;
    const existingUser = await this.authRepository.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestError(errorMessages.USER_EXIST);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.authRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return {
      id: user.id,
      email: user.email,
    };
  }

  async login(data: LoginUserDTO) {
    const { email, password } = data;
    const user = await this.authRepository.findUserByEmail(email);

    if (!user) {
      throw new BadRequestError(errorMessages.USER_NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestError(errorMessages.INVALID_EMAIL);
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
