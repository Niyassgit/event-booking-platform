import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { HttpStatusCode } from "../../utils/HttpStatusCode";
import { successMessages } from "../../utils/messages";

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);

export class AuthController {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = await authService.register({ name, email, password });
    res
      .status(HttpStatusCode.CREATED)
      .json({ message: successMessages.REGISTER_SUCCESSS, data: user });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const data = await authService.login({ email, password });
    return res.status(HttpStatusCode.OK).json({ success: true, data });
  }
}
