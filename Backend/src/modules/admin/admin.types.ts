import { z } from "zod";
import { createServiceSchema, updateServiceSchema } from "./admin.schema";

export type CreateServiceDTO = z.infer<typeof createServiceSchema>["body"];
export type UpdateServiceDTO = z.infer<typeof updateServiceSchema>["body"];

