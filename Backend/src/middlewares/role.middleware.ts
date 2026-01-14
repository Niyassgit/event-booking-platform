import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../utils/errors";
import { Role } from "@prisma/client";
import { errorMessages } from "../utils/messages";

export const authorize = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ForbiddenError(errorMessages.USER_NOT_AUTHENTICATED);
    }

    if (!allowedRoles.includes(req.user.role as Role)) {
      throw new ForbiddenError(errorMessages.PERMISSION_DENIED);
    }

    next();
  };
};

