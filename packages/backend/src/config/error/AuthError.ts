import { ApplicationError } from "./ApplicationError";

export class AuthError extends ApplicationError {
  constructor(message: string, statusCode = 400) {
    super(message, statusCode);

    this.name = "AuthError";
  }
}
