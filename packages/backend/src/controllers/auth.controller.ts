import { Response } from "express";
import {
  Body,
  Get,
  JsonController,
  Post,
  Res,
  UseBefore,
} from "routing-controllers";
import { IUserAuthenticationData } from "../config/interfaces/user.interrfaces";
import { AuthenticationMiddleware } from "../config/middlewares/authentication.middleware";
import { authenticateUser } from "../services/auth/authenticate.service";
import { getMe } from "../services/auth/getMe.service";

@JsonController("/auth")
export class AuthController {
  @Post("/signin")
  async authenticate(@Body() authData: IUserAuthenticationData) {
    return await authenticateUser(authData);
  }

  @UseBefore(AuthenticationMiddleware)
  @Get("/me")
  async me(@Res() res: Response) {
    const { id } = res.locals.user;
    return await getMe(id);
  }
}
