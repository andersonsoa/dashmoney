import { TransactionRepository } from "../../repositories/transaction.respository";

export async function listTransactionByPeriod(id: string) {
  return await TransactionRepository.listByPeriod(id);
}
