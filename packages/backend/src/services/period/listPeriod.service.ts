import { PeriodRepository } from "../../repositories/period.repository";

export async function listPeriod(userId: string) {
  return await PeriodRepository.list(userId);
}
