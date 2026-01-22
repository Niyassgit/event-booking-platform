import { z } from "zod";

const dateTransformer = (val: string) => {
  if (val.includes("T")) return new Date(val);
  return new Date(val + "T00:00:00");
};

const dateTransformerEnd = (val: string) => {
  if (val.includes("T")) return new Date(val);
  return new Date(val + "T23:59:59");
};

export const createServiceSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    category: z.string().min(1, "Category is required"),
    pricePerDay: z.coerce.number().positive("Price must be positive"),
    description: z.string().min(1, "Description is required"),
    location: z.string().min(1, "Location is required"),
    contactDetails: z.string().min(1, "Contact details are required"),
    availableFrom: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format for availableFrom",
    }).transform(dateTransformer),
    availableTo: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format for availableTo",
    }).transform(dateTransformerEnd),
  }),
});

export const updateServiceSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").optional(),
    category: z.string().min(1, "Category is required").optional(),
    pricePerDay: z.coerce.number().positive("Price must be positive").optional(),
    description: z.string().min(1, "Description is required").optional(),
    location: z.string().min(1, "Location is required").optional(),
    contactDetails: z.string().min(1, "Contact details are required").optional(),
    availableFrom: z.string().refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date format for availableFrom",
    }).transform((val) => val ? dateTransformer(val) : undefined).optional(),
    availableTo: z.string().refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date format for availableTo",
    }).transform((val) => val ? dateTransformerEnd(val) : undefined).optional(),
  }),
  params: z.object({
    serviceId: z.string().uuid("Invalid service ID"),
  }),
});

export const serviceIdSchema = z.object({
  params: z.object({
    serviceId: z.string().uuid("Invalid service ID"),
  }),
});

