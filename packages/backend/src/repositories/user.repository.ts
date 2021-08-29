import { getRepository } from "typeorm";
import { IUserData } from "../config/interfaces/user.interrfaces";
import { User } from "../models/User.model";

export class UserRepository {
  static async getUserByEmail(email: string) {
    return await getRepository(User).findOne({
      where: {
        email,
      },
    });
  }

  static async getUser(id: string) {
    return await getRepository(User).findOne({
      where: {
        id,
      },
    });
  }

  static async createNewUser(userData: IUserData) {
    const repository = getRepository(User);

    const newUser = repository.create(userData);

    await repository.save(newUser);

    return newUser;
  }
}
