import { Request, Response } from "express";
import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from "routing-controllers";
import { ApplicationError } from "../error/ApplicationError";

@Middleware({ type: "after" })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  error(error: ApplicationError, req: Request, res: Response) {
    if (error instanceof ApplicationError) {
      return res
        .status(error.statusCode)
        .json({ type: error.name, message: error.message });
    }

    return res
      .status(500)
      .json({ type: "ServerError", message: "Erro interno no servidor" });
  }
}
