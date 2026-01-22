import { z } from "zod";
import { registerSchema, loginSchema } from "./auth.schema";

export type RegisterUserDTO = z.infer<typeof registerSchema>["body"];
export type LoginUserDTO = z.infer<typeof loginSchema>["body"];
