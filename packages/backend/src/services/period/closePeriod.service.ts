import { PeriodRepository } from "../../repositories/period.repository";

export async function closePeriod(id: string) {
  const period = await PeriodRepository.show(id);

  period.payed = 1;
  period.payed_at = new Date();

  return PeriodRepository.update(id, period);
}
