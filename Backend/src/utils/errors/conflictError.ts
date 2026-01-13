import { appError } from "./appError";

export class conflictError extends appError {
  constructor(message: "Conflict Error") {
    super(message, 409);
  }
}
