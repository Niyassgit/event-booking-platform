import { Request, Response } from "express";
import { IAuthService } from "./interfaces/IAuthService";
import { HttpStatusCode } from "../../utils/HttpStatusCode";
import { successMessages } from "../../utils/messages";

export class AuthController {
  constructor(private authService: IAuthService) { }

  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = await this.authService.register({ name, email, password });
    res
      .status(HttpStatusCode.CREATED)
      .json({ success: true, message: successMessages.REGISTER_SUCCESSS, data: user });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const data = await this.authService.login({ email, password });
    return res.status(HttpStatusCode.OK).json({ success: true, data });
  }
}
