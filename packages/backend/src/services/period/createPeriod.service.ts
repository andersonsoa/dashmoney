import { ApplicationError } from "../../config/error";
import { Period } from "../../models/Period.model";
import { PeriodRepository } from "../../repositories/period.repository";
import { UserRepository } from "../../repositories/user.repository";

export async function createPeriod(data: Period) {
  const user = await UserRepository.getUser(data.user_id);
  if (!user) throw new ApplicationError("Usuário não encontrado");

  return await PeriodRepository.create(data);
}
