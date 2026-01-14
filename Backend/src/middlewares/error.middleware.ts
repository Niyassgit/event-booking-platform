import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { HttpStatusCode } from "../utils/HttpStatusCode";
import { errorMessages } from "../utils/messages";

export const globalErrorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    /* eslint-disable @typescript-eslint/no-unused-vars */
    _next: NextFunction
) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({ success: false, message: err.message });
    } else {
        res
            .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .json({ success: false, message: errorMessages.IINTERNAL_SERVER_ERROR });
    }
};
