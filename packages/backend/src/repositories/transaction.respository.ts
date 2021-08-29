import { getRepository } from "typeorm";
import { ApplicationError } from "../config/error/ApplicationError";
import { Transaction } from "../models/Transaction.model";

export class TransactionRepository {
  static async create(data: Transaction) {
    const repository = getRepository(Transaction);

    const transaction = repository.create(data);
    await repository.save(transaction);

    return transaction;
  }

  static async list(userId: string, filtes?: { [name: string]: string }) {
    const transactions = getRepository(Transaction)
      .createQueryBuilder("transactions")
      .select([
        "transactions.id",
        "transactions.title",
        "transactions.value",
        "transactions.created_at",

        "card.id",
        "card.title",
        "card.image",

        "periods.id",
        "periods.title",
      ])
      .innerJoin("transactions.period", "periods")
      .innerJoin("transactions.card", "card")
      .innerJoin("periods.user", "user")
      .where("user.id = :userId", { userId });

    if (filtes?.period) {
      transactions.andWhere("periods.id = :period", { period: filtes.period });
    }

    return await transactions.getMany();
  }

  static async listByPeriod(periodId: string) {
    const repository = getRepository(Transaction);

    const transactions = await repository.find({
      where: {
        period_id: periodId,
      },
    });

    return transactions;
  }

  static async show(id: string) {
    const repository = getRepository(Transaction);

    return await repository.findOne({
      where: {
        id,
      },
    });
  }

  static async delete(id: string) {
    const repository = getRepository(Transaction);

    return await repository.delete(id);
  }
}
