import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { validate } from "../../middlewares/validate.middleware";
import { asyncHandler } from "../../utils/asyncHandler";
import { loginSchema, registerSchema } from "./auth.schema";

const authRoutes = Router();


const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRoutes.post(
  "/signup",
  validate(registerSchema),
  asyncHandler((req, res) => authController.register(req, res))
);

authRoutes.post(
  "/login",
  validate(loginSchema),
  asyncHandler((req, res) => authController.login(req, res))
);

export default authRoutes;
