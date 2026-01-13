import { appError } from "./appError";

export class notFoundError extends appError {
  constructor(message = "Resource Not Found") {
    super(message, 404);
  }
}