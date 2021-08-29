import { TransactionRepository } from "../../repositories/transaction.respository";

export async function listTransaction(
  userId: string,
  filters: { [name: string]: string }
) {
  return await TransactionRepository.list(userId, filters);
}
