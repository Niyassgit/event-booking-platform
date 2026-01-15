import { Router } from "express";
import { AdminRepository } from "./admin.repository";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { validate } from "../../middlewares/validate.middleware";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";
import { Role } from "@prisma/client";
import { createServiceSchema, updateServiceSchema, serviceIdSchema } from "./admin.schema";

const adminRoutes = Router();

const adminRepository = new AdminRepository();
const adminService = new AdminService(adminRepository);
const adminController = new AdminController(adminService);

adminRoutes.use(authenticate);
adminRoutes.use(authorize(Role.ADMIN));


adminRoutes.get(
  "/users",
  asyncHandler((req, res) => adminController.findUsers(req, res))
);
adminRoutes.get(
  "/user/:userId",
  asyncHandler((req, res) => adminController.findUserById(req, res))
);

adminRoutes.get(
  "/services",
  asyncHandler((req, res) => adminController.findAllServices(req, res))
);
adminRoutes.get(
  "/service/:serviceId",
  validate(serviceIdSchema),
  asyncHandler((req, res) => adminController.findServiceById(req, res))
);
adminRoutes.post(
  "/service",
  validate(createServiceSchema),
  asyncHandler((req, res) => adminController.createService(req, res))
);
adminRoutes.put(
  "/service/:serviceId",
  validate(updateServiceSchema),
  asyncHandler((req, res) => adminController.updateService(req, res))
);
adminRoutes.delete(
  "/service/:serviceId",
  validate(serviceIdSchema),
  asyncHandler((req, res) => adminController.deleteService(req, res))
);

export default adminRoutes;