import { ZodError, ZodType, ZodIssue } from "zod";
import { Request, Response, NextFunction } from "express";
import { Query, ParamsDictionary } from "express-serve-static-core";
import { errorMessages } from "../utils/messages";

interface ZodLikeError {
  name: string;
  issues: ZodIssue[];
}

export const validate = (schema: ZodType) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    }) as { body?: unknown; query?: unknown; params?: unknown };

    if (parsed.body) req.body = parsed.body;
    if (parsed.query) req.query = parsed.query as Query;
    if (parsed.params) req.params = parsed.params as ParamsDictionary;

    next();
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: errorMessages.VALIDATION_FAILED,
        errors: error.issues,
      });
    }

    const potentialZodError = error as ZodLikeError;
    if (potentialZodError && potentialZodError.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: errorMessages.VALIDATION_FAILED,
        errors: potentialZodError.issues,
      });
    }
    next(error);
  }
};
