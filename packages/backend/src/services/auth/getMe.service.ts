import { UserRepository } from "../../repositories/user.repository";
import { AuthError } from "../../config/error/AuthError";

export async function getMe(userId: string) {
  const user = await UserRepository.getUser(userId);
  if (!user) throw new AuthError("Usuário não encontrado");

  delete user.password;

  return { user };
}
