import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validate } from "../../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "./auth.schema";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/register", validate(registerSchema), authController.register);

authRoutes.post("/login", validate(loginSchema), authController.login);

export default authRoutes;
