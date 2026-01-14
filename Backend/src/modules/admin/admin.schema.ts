import { z } from "zod";

export const createServiceSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    category: z.string().min(1, "Category is required"),
    pricePerDay: z.number().positive("Price must be positive"),
    description: z.string().min(1, "Description is required"),
    location: z.string().min(1, "Location is required"),
    contactDetails: z.string().min(1, "Contact details are required"),
    availableFrom: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format for availableFrom",
    }),
    availableTo: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format for availableTo",
    }),
  }),
});

export const updateServiceSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").optional(),
    category: z.string().min(1, "Category is required").optional(),
    pricePerDay: z.number().positive("Price must be positive").optional(),
    description: z.string().min(1, "Description is required").optional(),
    location: z.string().min(1, "Location is required").optional(),
    contactDetails: z.string().min(1, "Contact details are required").optional(),
    availableFrom: z.string().refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date format for availableFrom",
    }).optional(),
    availableTo: z.string().refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date format for availableTo",
    }).optional(),
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

