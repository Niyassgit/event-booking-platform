import { Request, Response } from "express";
import { UserService } from "./user.service";
import { HttpStatusCode } from "../../utils/HttpStatusCode";

export class UserController {
  constructor(private userService: UserService) {}

  async getAllServices(req: Request, res: Response) {
    const data = await this.userService.getAllServices();
    return res.status(HttpStatusCode.OK).json({ success: true, data });
  }

  async bookService(req: Request, res: Response) {
    const { serviceId } = req.params;
    const message = await this.userService.bookService(serviceId as string);
    return res.status(HttpStatusCode.OK).json({ success: true, message });
  }
}
