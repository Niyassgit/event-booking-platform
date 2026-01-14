import express from "express";
import authRoutes from "./modules/auth/auth.routes";
import adminRoutes from "./modules/admin/admin.routes";
import cors from "cors";
import { env } from "./config/env";
import morgan from "morgan";
import { globalErrorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(
  cors({
    origin: env.ORIGIN,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Error handler middleware (must be last)
app.use(globalErrorHandler);

export default app;
