import { Request, Response } from "express";
import { HttpStatusCode } from "../../utils/HttpStatusCode";
import { AdminService } from "./admin.service";

export class AdminController {
  constructor(private adminService: AdminService) {}

  async findUsers(req: Request, res: Response) {
    const data = await this.adminService.listAllUsers();
    res.status(HttpStatusCode.OK).json({ success: true, data });
  }

  async findUserById(req: Request, res: Response) {
    const { userId } = req.params;
    const data = await this.adminService.findUserById(userId as string);
    return res.status(HttpStatusCode.OK).json({ success: true, data });
  }
}
