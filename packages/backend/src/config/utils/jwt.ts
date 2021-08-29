import { sign, decode, verify } from "jsonwebtoken";
import { ApplicationError } from "../error/ApplicationError";
import { AuthError } from "../error/AuthError";
import { ITokenPayload } from "../interfaces/jwt.interfaces";

export function generateToken(payload: ITokenPayload) {
  return sign(payload, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.JWT_DURATION,
  });
}

export function parseJWTToken(token: string) {
  try {
    const payload: ITokenPayload = verify(
      token,
      process.env.JWT_SECRET
    ) as ITokenPayload;

    return payload;
  } catch {
    throw new AuthError("token inválido", 401);
  }
}
