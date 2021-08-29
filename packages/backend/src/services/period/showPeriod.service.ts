import { ApplicationError } from "../../config/error";
import { PeriodRepository } from "../../repositories/period.repository";

export async function showPeriod(id: string) {
  const period = await PeriodRepository.show(id);

  if (!period) throw new ApplicationError("Periodo não encontrado");

  return period;
}
