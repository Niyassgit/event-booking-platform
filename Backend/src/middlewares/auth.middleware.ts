import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { UnauthorizedError } from "../utils/errors";
import { errorMessages } from "../utils/messages";

// Extend Express Request to include user info
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError(errorMessages.NO_TOKEN_PROVIDED);
    }

    const token = authHeader.substring(7);

    if (!token) {
      throw new UnauthorizedError(errorMessages.NO_TOKEN_PROVIDED);
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      userId: string;
      role: string;
    };

    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedError(errorMessages.INVALID_TOKEN);
    }
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError(errorMessages.TOKEN_EXPIRED);
    }
    next(error);
  }
};

