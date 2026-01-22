import { RegisterUserDTO, LoginUserDTO } from "../auth.types";
import { LoginResponseDTO } from "../dtos/LoginResponseDTO";

export interface IAuthService {
    register(data: RegisterUserDTO): Promise<string>;
    login(data: LoginUserDTO): Promise<LoginResponseDTO>;
}