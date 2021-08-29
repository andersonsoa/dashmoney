import { Period } from "../../models/Period.model";
import { PeriodRepository } from "../../repositories/period.repository";

export async function updatePeriod(id: string, data: Period) {
  return await PeriodRepository.update(id, data);
}
