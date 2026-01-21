import { RegisterUserDTO, LoginUserDTO } from "../auth.types";

export interface IAuthService {
    register(data: RegisterUserDTO): Promise<any>;
    login(data: LoginUserDTO): Promise<any>;
}