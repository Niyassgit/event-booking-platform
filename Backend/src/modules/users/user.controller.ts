import { Request, Response } from "express";
import { UserService } from "./user.service";
import { HttpStatusCode } from "../../utils/HttpStatusCode";

export class UserController {
  constructor(private userService: UserService) { }

  async getAllServices(req: Request, res: Response) {
    const filters = req.query;
    const data = await this.userService.getAllServices(filters);
    return res.status(HttpStatusCode.OK).json({ success: true, data });
  }

  async bookService(req: Request, res: Response) {
    const { serviceId } = req.params;
    const userId = req.user?.userId;
    const { date } = req.body; // user dashboard sends 'date' as bookingDate string

    if (!userId) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({ success: false, message: "User not authenticated" });
    }

    const message = await this.userService.bookService(userId, serviceId as string, date);
    return res.status(HttpStatusCode.OK).json({ success: true, message });
  }

  async getUserBookings(req: Request, res: Response) {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({ success: false, message: "User not authenticated" });
    }
    const data = await this.userService.getUserBookings(userId);
    return res.status(HttpStatusCode.OK).json({ success: true, data });
  }
}
