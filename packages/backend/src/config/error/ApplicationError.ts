export class ApplicationError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);

    this.statusCode = statusCode;
    this.name = "ApplicationError";

    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}
