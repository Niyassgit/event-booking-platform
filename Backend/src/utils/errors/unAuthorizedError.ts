import { appError } from "./appError";

export class unautharizedError extends appError {
  constructor(message = "Unautharized") {
    super(message, 401);
  }
}