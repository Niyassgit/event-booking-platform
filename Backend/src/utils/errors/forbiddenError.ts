import { appError } from "./appError";

export class forbiddenError extends appError {
  constructor(message = "Access Denied") {
    super(message, 403);
  }
}