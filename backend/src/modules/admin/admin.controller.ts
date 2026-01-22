import { Request, Response } from "express";
import { HttpStatusCode } from "../../utils/HttpStatusCode";
import { IAdminService } from "./interfaces/IAdminService";
import { CreateServiceDTO, UpdateServiceDTO } from "./admin.types";

export class AdminController {
  constructor(private adminService: IAdminService) { }

  async findUsers(req: Request, res: Response) {
    const filters = req.query as Record<string, string | undefined>;
    const data = await this.adminService.listAllUsers(filters);
    res.status(HttpStatusCode.OK).json({ success: true, ...data });
  }

  async findUserById(req: Request, res: Response) {
    const userId = req.params.userId as string;
    const data = await this.adminService.findUserById(userId);
    return res.status(HttpStatusCode.OK).json({ success: true, data });
  }

  async findAllServices(req: Request, res: Response) {
    const filters = req.query as Record<string, string | undefined>;
    const data = await this.adminService.listAllServices(filters);
    res.status(HttpStatusCode.OK).json({ success: true, ...data });
  }

  async findServiceById(req: Request, res: Response) {
    const serviceId = req.params.serviceId as string;
    const data = await this.adminService.findServiceById(serviceId);
    return res.status(HttpStatusCode.OK).json({ success: true, data });
  }

  async createService(req: Request, res: Response) {
    const serviceData: CreateServiceDTO = req.body;
    const data = await this.adminService.createService(serviceData);
    res.status(HttpStatusCode.CREATED).json({ success: true, data });
  }

  async updateService(req: Request, res: Response) {
    const { serviceId } = req.params;
    const serviceData: UpdateServiceDTO = req.body;

    const data = await this.adminService.updateService(
      serviceId as string,
      serviceData,
    );
    res.status(HttpStatusCode.OK).json({ success: true, data });
  }

  async deleteService(req: Request, res: Response) {
    const serviceId = req.params.serviceId as string;
    await this.adminService.deleteService(serviceId);
    res
      .status(HttpStatusCode.OK)
      .json({ success: true, message: "Service deleted successfully" });
  }

  async getAllBookings(req: Request, res: Response) {
    const filters = req.query as Record<string, string | undefined>;
    const data = await this.adminService.getAllBookings(filters);
    res.status(HttpStatusCode.OK).json({ success: true, ...data });
  }
}
