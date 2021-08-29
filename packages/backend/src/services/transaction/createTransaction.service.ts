import { ApplicationError } from "../../config/error";
import { Transaction } from "../../models/Transaction.model";
import { CardRepository } from "../../repositories/card.repository";
import { PeriodRepository } from "../../repositories/period.repository";
import { TransactionRepository } from "../../repositories/transaction.respository";

export async function createTransaction(data: Transaction) {
  const period = await PeriodRepository.show(data.period_id);
  if (!period) throw new ApplicationError("Periodo não encontrado");

  const card = await CardRepository.show(data.card_id);
  if (!card) throw new ApplicationError("Cartão não encontrado");

  return await TransactionRepository.create(data);
}
