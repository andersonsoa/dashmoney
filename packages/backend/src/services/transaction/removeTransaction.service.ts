import { ApplicationError } from "../../config/error/ApplicationError";
import { TransactionRepository } from "../../repositories/transaction.respository";

export async function removeTransaction(userId: string, transactionId: string) {
  const transaction = await TransactionRepository.show(transactionId);

  if (!transaction) throw new ApplicationError("Transação não encontrada");

  return !!(await TransactionRepository.delete(transactionId));
}
