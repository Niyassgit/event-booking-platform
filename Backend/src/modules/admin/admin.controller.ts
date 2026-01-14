import { Request, Response } from "express";
import { HttpStatusCode } from "../../utils/HttpStatusCode";
import { AdminService } from "./admin.service";
import { CreateServiceDTO, UpdateServiceDTO } from "./admin.types";

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

  async findAllServices(req: Request, res: Response) {
    const data = await this.adminService.listAllServices();
    res.status(HttpStatusCode.OK).json({ success: true, data });
  }

  async findServiceById(req: Request, res: Response) {
    const { serviceId } = req.params;
    const data = await this.adminService.findServiceById(serviceId as string);
    return res.status(HttpStatusCode.OK).json({ success: true, data });
  }

  async createService(req: Request, res: Response) {
    const serviceData: CreateServiceDTO = req.body;
    // Handle both date strings (YYYY-MM-DD) and datetime strings
    const availableFrom = serviceData.availableFrom.includes('T') 
      ? new Date(serviceData.availableFrom) 
      : new Date(serviceData.availableFrom + 'T00:00:00');
    const availableTo = serviceData.availableTo.includes('T')
      ? new Date(serviceData.availableTo)
      : new Date(serviceData.availableTo + 'T23:59:59');
    
    const data = await this.adminService.createService({
      ...serviceData,
      availableFrom,
      availableTo,
    });
    res.status(HttpStatusCode.CREATED).json({ success: true, data });
  }

  async updateService(req: Request, res: Response) {
    const { serviceId } = req.params;
    const serviceData: UpdateServiceDTO = req.body;
    const updateData: any = { ...serviceData };
    
    if (serviceData.availableFrom) {
      updateData.availableFrom = serviceData.availableFrom.includes('T')
        ? new Date(serviceData.availableFrom)
        : new Date(serviceData.availableFrom + 'T00:00:00');
    }
    if (serviceData.availableTo) {
      updateData.availableTo = serviceData.availableTo.includes('T')
        ? new Date(serviceData.availableTo)
        : new Date(serviceData.availableTo + 'T23:59:59');
    }
    
    const data = await this.adminService.updateService(serviceId as string, updateData);
    res.status(HttpStatusCode.OK).json({ success: true, data });
  }

  async deleteService(req: Request, res: Response) {
    const { serviceId } = req.params;
    await this.adminService.deleteService(serviceId as string);
    res.status(HttpStatusCode.OK).json({ success: true, message: "Service deleted successfully" });
  }
}
