import { ApplicationError } from "./ApplicationError";

export class NotFoundError extends ApplicationError {
  constructor(message: string, statusCode = 403) {
    super(message, statusCode);

    this.name = "NotFoundError";
  }
}
