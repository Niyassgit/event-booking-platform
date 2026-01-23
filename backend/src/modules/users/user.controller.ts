import { Request, Response } from "express";
import { IUserService } from "./interfaces/IUserService";
import { HttpStatusCode } from "../../utils/HttpStatusCode";

export class UserController {
  constructor(private userService: IUserService) { }

  async getAllServices(req: Request, res: Response) {
    const filters = req.query as Record<string, string | undefined>;
    const [data, metadata] = await Promise.all([
      this.userService.getAllServices(filters),
      this.userService.getServiceMetadata()
    ]);
    return res.status(HttpStatusCode.OK).json({ success: true, data, metadata });
  }

  async getServiceById(req: Request, res: Response) {
    const serviceId = req.params.serviceId as string;
    const data = await this.userService.getServiceById(serviceId);
    return res.status(HttpStatusCode.OK).json({ success: true, data });
  }

  async bookService(req: Request, res: Response) {
    const serviceId = req.params.serviceId as string;
    const userId = req.user?.userId;
    const { date } = req.body;

    if (!userId) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ success: false, message: "User not authenticated" });
    }

    const message = await this.userService.bookService(
      userId,
      serviceId,
      date,
    );
    return res.status(HttpStatusCode.OK).json({ success: true, message });
  }

  async getUserBookings(req: Request, res: Response) {
    const userId = req.user?.userId;
    if (!userId) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ success: false, message: "User not authenticated" });
    }
    const data = await this.userService.getUserBookings(userId);
    return res.status(HttpStatusCode.OK).json({ success: true, data });
  }
}
