import { Router } from "express";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { asyncHandler } from "../../utils/asyncHandler";

const userRoutes = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoutes.get(
  "/services",
  asyncHandler((req, res) => userController.getAllServices(req, res))
);

userRoutes.post(
  "/service/:serviceId",
  asyncHandler((req, res) => userController.bookService(req, res))
);

export default userRoutes;
