import { Body, JsonController, Post } from "routing-controllers";
import { IUserData } from "../config/interfaces/user.interrfaces";
import { createUser } from "../services/user";

@JsonController("/users")
export class UserController {
  @Post("/")
  async createUser(@Body() userData: IUserData) {
    return await createUser(userData);
  }
}
