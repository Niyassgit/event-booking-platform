import { Router } from "express";
import { AdminRepository } from "./admin.repository";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { asyncHandler } from "../../utils/asyncHandler";

const adminRoutes = Router();

const adminRepository = new AdminRepository();
const adminService = new AdminService(adminRepository);
const adminController = new AdminController(adminService);

adminRoutes.get(
  "/users",
  asyncHandler((req, res) => adminController.findUsers(req, res))
);
adminRoutes.get(
  "/user/:userId",
  asyncHandler((req, res) => adminController.findUserById(req, res))
);

export default adminRoutes;