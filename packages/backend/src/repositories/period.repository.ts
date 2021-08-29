import { getRepository } from "typeorm";
import { NotFoundError } from "../config/error";
import { Period } from "../models/Period.model";

export class PeriodRepository {
  static async list(userId: string) {
    const repo = getRepository(Period);

    return await repo.find({
      where: {
        user_id: userId,
      },
    });
  }

  static async show(periodId: string) {
    const repo = getRepository(Period);

    return await repo.findOne(periodId, {
      relations: ["transactions"],
    });
  }

  static async create(data: Period) {
    const repo = getRepository(Period);

    const period = repo.create(data);
    await repo.save(period);

    return period;
  }

  static async update(periodId: string, periodData: Period) {
    const repo = getRepository(Period);

    const periodAlredyExists = await repo.findOne(periodId);
    if (!periodAlredyExists) throw new NotFoundError("Periodo não encontrado");

    repo.update(periodId, periodData);

    return await repo.findOne(periodId);
  }

  static async delete(periodId: string) {
    return await getRepository(Period).delete(periodId);
  }
}
