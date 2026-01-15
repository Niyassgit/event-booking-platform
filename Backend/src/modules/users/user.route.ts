import { Router } from "express";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { asyncHandler } from "../../utils/asyncHandler";

import { authenticate } from "../../middlewares/auth.middleware";

const userRoutes = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoutes.get(
  "/services",
  authenticate,
  asyncHandler((req, res) => userController.getAllServices(req, res))
);

userRoutes.get(
  "/service/:serviceId",
  authenticate,
  asyncHandler((req, res) => userController.getServiceById(req, res))
);

userRoutes.post(
  "/service/:serviceId",
  authenticate,
  asyncHandler((req, res) => userController.bookService(req, res))
);

userRoutes.get(
  "/bookings",
  authenticate,
  asyncHandler((req, res) => userController.getUserBookings(req, res))
);

export default userRoutes;
