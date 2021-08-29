import { IUserAuthenticationData } from "../../config/interfaces/user.interrfaces";
import { UserRepository } from "../../repositories/user.repository";
import { generateToken } from "../../config/utils/jwt";
import { AuthError } from "../../config/error/AuthError";

export async function authenticateUser(data: IUserAuthenticationData) {
  const user = await UserRepository.getUserByEmail(data.email);
  if (!user) throw new AuthError("Falha na autenticação");

  if (user.password !== data.password) {
    throw new AuthError("Falha na autenticação");
  }

  delete user.password;

  const token = generateToken({
    id: user.id,
    name: user.name,
    email: user.email,
  });

  return { token, user };
}
