import { appError } from "./appError";

export class badRequestError extends appError {
  constructor(message = "Bad request") {
    super(message, 400);
  }
}
