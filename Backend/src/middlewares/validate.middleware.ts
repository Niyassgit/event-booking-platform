import { ZodError, ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { errorMessages } from "../utils/messages";

export const validate = (schema: ZodObject) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: errorMessages.VALIDATION_FAILED,
        errors: error.issues,
      });
    }
    next(error);
  }
};
