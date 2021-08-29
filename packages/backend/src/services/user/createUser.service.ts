import { IUserData } from "../../config/interfaces/user.interrfaces";
import { UserRepository } from "../../repositories/user.repository";

export async function createUser(userData: IUserData) {
  const userAlreadyExists = await UserRepository.getUserByEmail(userData.email);
  if (userAlreadyExists) {
    throw new Error("usuário já cadastrado");
  }

  return await UserRepository.createNewUser(userData);
}
