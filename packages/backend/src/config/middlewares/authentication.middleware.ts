import { NextFunction, Request, Response } from "express";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { AuthError } from "../error/AuthError";
import { parseJWTToken } from "../utils/jwt";

export class AuthenticationMiddleware implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"];

    if (!token) {
      throw new AuthError("Usuario não autorizado", 401);
    }

    const payload = parseJWTToken(token.replace("Bearer ", ""));

    res.locals = {
      user: {
        id: payload.id,
        name: payload.name,
        email: payload.email,
      },
    };

    next();
  }
}
