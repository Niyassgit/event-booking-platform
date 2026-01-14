import { AppError } from "./appError";

export class ConflictError extends AppError {
  constructor(message = "Conflict Error") {
    super(message, 409);
  }
}
